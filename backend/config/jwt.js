const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

class JWTManager {
  generateAccessToken(payload) {
    try {
      return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
          issuer: process.env.JWT_ISSUER,
          audience: process.env.JWT_AUDIENCE,
        }
      );
    } catch (error) {
      logger.error('Access token generation failed:', error);
      throw new Error('Token generation failed');
    }
  }

  generateRefreshToken(payload) {
    try {
      return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
          issuer: process.env.JWT_ISSUER,
          audience: process.env.JWT_AUDIENCE,
        }
      );
    } catch (error) {
      logger.error('Refresh token generation failed:', error);
      throw new Error('Token generation failed');
    }
  }

  generateTokenPair(payload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  verifyAccessToken(token) {
    try {
      const options = {};
      if (process.env.JWT_ISSUER) options.issuer = process.env.JWT_ISSUER;
      if (process.env.JWT_AUDIENCE) options.audience = process.env.JWT_AUDIENCE;
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET, options);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      }
      throw error;
    }
  }

  verifyRefreshToken(token) {
    try {
      const options = {};
      if (process.env.JWT_ISSUER) options.issuer = process.env.JWT_ISSUER;
      if (process.env.JWT_AUDIENCE) options.audience = process.env.JWT_AUDIENCE;
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET, options);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      logger.error('Token decode failed:', error);
      return null;
    }
  }

  generateEmailVerificationToken(userId) {
    const options = { expiresIn: '24h' };
    if (process.env.JWT_ISSUER) options.issuer = process.env.JWT_ISSUER;
    if (process.env.JWT_AUDIENCE) options.audience = process.env.JWT_AUDIENCE;
    return jwt.sign(
      { userId, purpose: 'email_verification' },
      process.env.JWT_ACCESS_SECRET,
      options
    );
  }

  generatePasswordResetToken(userId) {
    const options = { expiresIn: '1h' };
    if (process.env.JWT_ISSUER) options.issuer = process.env.JWT_ISSUER;
    if (process.env.JWT_AUDIENCE) options.audience = process.env.JWT_AUDIENCE;
    return jwt.sign(
      { userId, purpose: 'password_reset' },
      process.env.JWT_ACCESS_SECRET,
      options
    );
  }

  generateOTPToken(otp, userId) {
    return jwt.sign(
      { userId, otp, purpose: 'otp_verification' },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '10m' }
    );
  }
}

module.exports = new JWTManager();