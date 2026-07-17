const authService = require('../services/auth.service');
const logger = require('../utils/logger');
const User = require('../models/User');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, role, phone } = req.body;

      // Capture registration IP
      const metadata = {
        registeredIp: req.ip,
        userAgent: req.headers['user-agent'],
      };

      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        role,
        phone,
        metadata,
      });

      // Set refresh token in cookie
      this.setRefreshTokenCookie(res, result.tokens.refreshToken, result.rememberMe);

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please verify your email.',
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, rememberMe = false } = req.body;

      const result = await authService.login({ email, password, rememberMe });

      // Set refresh token in cookie
      this.setRefreshTokenCookie(res, result.tokens.refreshToken, rememberMe);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      const result = await authService.refreshToken(refreshToken);

      this.setRefreshTokenCookie(res, result.tokens.refreshToken);

      res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const userId = req.user?._id || req.body.userId;
      await authService.logout(userId);

      // Clear refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      const result = await authService.resetPassword(token, password);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;
      const result = await authService.verifyEmail(token);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user._id;

      const result = await authService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendOTP(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.sendOTP(email);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(req, res, next) {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyOTP(email, otp);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const allowedFields = ['firstName', 'lastName', 'phone', 'preferences'];
      const updates = {};

      Object.keys(req.body).forEach(key => {
        if (allowedFields.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
      ).populate('role');

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: authService.sanitizeUser(user),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  setRefreshTokenCookie(res, refreshToken, rememberMe = false) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000, // 30 days or 7 days
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
  }
}

module.exports = new AuthController();