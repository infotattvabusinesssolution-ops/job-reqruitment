const User = require('../models/User');
const Role = require('../models/Role');
const Candidate = require('../models/Candidate');
const jwtManager = require('../config/jwt');
const emailService = require('../utils/emailService');
const logger = require('../utils/logger');
const crypto = require('crypto');
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors');

class AuthService {
  /**
   * Register a new user
   */
  async register({ email, password, firstName, lastName, role: roleName, phone }) {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Get the role
    const role = await Role.findOne({ name: roleName || 'candidate' });
    if (!role) {
      throw new BadRequestError('Invalid role specified');
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: role._id,
      metadata: {
        registeredIp: '0.0.0.0', // Will be updated by controller
      },
    });

    // Create profile based on role
    if (roleName === 'candidate') {
      await Candidate.create({
        user: user._id,
      });
    }

    // Generate verification token
    const verificationToken = jwtManager.generateEmailVerificationToken(user._id);
    user.emailVerificationToken = verificationToken;
    await user.save({ validateBeforeSave: false });

    // Send welcome email with verification
    try {
      await emailService.sendWelcomeEmail(user);
      await emailService.sendEmailVerification(user, verificationToken);
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      // Don't throw - email failure shouldn't block registration
    }

    // Generate token pair
    const tokenPayload = { userId: user._id, role: role.name };
    const tokens = jwtManager.generateTokenPair(tokenPayload);

    // Save refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  /**
   * Login user
   */
  async login({ email, password, rememberMe = false }) {
    // Find user with password
    const user = await User.findOne({ email })
      .select('+password +refreshToken +loginAttempts +lockUntil')
      .populate('role');

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if account is locked
    if (user.isLocked()) {
      throw new ForbiddenError('Account is locked. Try again after 30 minutes.');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ForbiddenError('Account is deactivated. Contact support.');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      await user.incrementLoginAttempts();
      throw new UnauthorizedError('Invalid email or password');
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate tokens
    const role = user.role;
    const tokenPayload = { userId: user._id, role: role.name };
    const tokens = jwtManager.generateTokenPair(tokenPayload);

    // Save refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      user: this.sanitizeUser(user),
      tokens,
      rememberMe,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token is required');
    }

    // Verify refresh token
    const decoded = jwtManager.verifyRefreshToken(refreshToken);

    // Find user with refresh token
    const user = await User.findById(decoded.userId)
      .select('+refreshToken')
      .populate('role');

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (!user.isActive) {
      throw new ForbiddenError('Account is deactivated');
    }

    // Generate new token pair
    const role = user.role;
    const tokenPayload = { userId: user._id, role: role.name };
    const tokens = jwtManager.generateTokenPair(tokenPayload);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  /**
   * Logout user
   */
  async logout(userId) {
    const user = await User.findById(userId).select('+refreshToken');
    if (user) {
      user.refreshToken = null;
      await user.save({ validateBeforeSave: false });
    }
    return { message: 'Logged out successfully' };
  }

  /**
   * Forgot password
   */
  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether email exists
      return { message: 'If the email exists, a reset link has been sent.' };
    }

    // Generate reset token
    const resetToken = jwtManager.generatePasswordResetToken(user._id);
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save({ validateBeforeSave: false });

    // Send reset email
    try {
      await emailService.sendPasswordResetEmail(user, resetToken);
    } catch (error) {
      logger.error('Failed to send password reset email:', error);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new BadRequestError('Failed to send reset email. Try again.');
    }

    return { message: 'If the email exists, a reset link has been sent.' };
  }

  /**
   * Reset password
   */
  async resetPassword(token, newPassword) {
    let decoded;
    try {
      decoded = jwtManager.verifyAccessToken(token);
    } catch (error) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    if (decoded.purpose !== 'password_reset') {
      throw new BadRequestError('Invalid reset token');
    }

    const user = await User.findById(decoded.userId).select('+passwordResetToken +passwordResetExpires');
    if (!user || !user.passwordResetToken || user.passwordResetExpires < Date.now()) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshToken = null; // Invalidate all sessions
    await user.save();

    return { message: 'Password reset successfully' };
  }

  /**
   * Verify email
   */
  async verifyEmail(token) {
    let decoded;
    try {
      decoded = jwtManager.verifyAccessToken(token);
    } catch (error) {
      throw new BadRequestError('Invalid or expired verification token');
    }

    if (decoded.purpose !== 'email_verification') {
      throw new BadRequestError('Invalid verification token');
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    return { message: 'Email verified successfully' };
  }

  /**
   * Change password
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new BadRequestError('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  /**
   * Send OTP
   */
  async sendOTP(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 600000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    try {
      await emailService.sendOTP(email, otp);
    } catch (error) {
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new BadRequestError('Failed to send OTP');
    }

    return { message: 'OTP sent successfully' };
  }

  /**
   * Verify OTP
   */
  async verifyOTP(email, otp) {
    const user = await User.findOne({ email }).select('+otp +otpExpires');
    if (!user || !user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
      throw new BadRequestError('Invalid or expired OTP');
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return { message: 'OTP verified successfully' };
  }

  /**
   * Sanitize user object (remove sensitive fields)
   */
  sanitizeUser(user) {
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    delete userObj.refreshToken;
    delete userObj.emailVerificationToken;
    delete userObj.passwordResetToken;
    delete userObj.passwordResetExpires;
    delete userObj.otp;
    delete userObj.otpExpires;
    delete userObj.twoFactorSecret;
    delete userObj.loginAttempts;
    delete userObj.lockUntil;
    return userObj;
  }
}

module.exports = new AuthService();