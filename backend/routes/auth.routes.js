const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  otpValidator,
  verifyOtpValidator,
  updateProfileValidator,
} = require('../validators/auth.validator');

// Public routes
router.post('/register', validate(registerValidator), authController.register.bind(authController));
router.post('/login', validate(loginValidator), authController.login.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post('/forgot-password', validate(forgotPasswordValidator), authController.forgotPassword.bind(authController));
router.post('/reset-password', validate(resetPasswordValidator), authController.resetPassword.bind(authController));
router.get('/verify-email/:token', authController.verifyEmail.bind(authController));
router.post('/send-otp', validate(otpValidator), authController.sendOTP.bind(authController));
router.post('/verify-otp', validate(verifyOtpValidator), authController.verifyOTP.bind(authController));

// Protected routes
router.post('/logout', authenticate, authController.logout.bind(authController));
router.get('/me', authenticate, authController.getMe.bind(authController));
router.put('/profile', authenticate, validate(updateProfileValidator), authController.updateProfile.bind(authController));
router.put('/change-password', authenticate, validate(changePasswordValidator), authController.changePassword.bind(authController));

module.exports = router;