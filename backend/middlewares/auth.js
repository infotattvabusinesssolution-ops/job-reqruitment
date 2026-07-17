const jwtManager = require('../config/jwt');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Authenticate user by verifying JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Check cookies
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError('Access token is required');
    }

    // Verify token
    const decoded = jwtManager.verifyAccessToken(token);

    // Get user from database
    const user = await User.findById(decoded.userId)
      .select('-password -refreshToken')
      .populate('role');

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ForbiddenError('Account is deactivated');
    }

    // Check if email is verified
    if (!user.isEmailVerified && process.env.NODE_ENV === 'production') {
      throw new ForbiddenError('Please verify your email first');
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role?.name || 'candidate';

    next();
  } catch (error) {
    if (error.message === 'Access token expired') {
      return next(new UnauthorizedError('Token expired, please refresh'));
    }
    if (error.message === 'Invalid access token') {
      return next(new UnauthorizedError('Invalid token'));
    }
    next(error);
  }
};

/**
 * Authorize by role(s)
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    const userRole = req.user.role?.name || req.userRole;

    if (!allowedRoles.includes(userRole)) {
      logger.warn(`Unauthorized access attempt by user ${req.userId} with role ${userRole}`, {
        requiredRoles: allowedRoles,
        userRole,
        path: req.originalUrl,
      });
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }

    next();
  };
};

/**
 * Authorize by permission
 */
const authorizePermission = (...permissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authentication required'));
      }

      const userRole = req.user.role;
      if (!userRole || !userRole.permissions) {
        return next(new ForbiddenError('No permissions assigned'));
      }

      const hasPermission = permissions.some(permission =>
        userRole.permissions.includes(permission)
      );

      if (!hasPermission) {
        return next(new ForbiddenError('Insufficient permissions'));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Optional authentication - doesn't throw if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = jwtManager.verifyAccessToken(token);
      const user = await User.findById(decoded.userId)
        .select('-password -refreshToken')
        .populate('role');

      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id;
        req.userRole = user.role?.name || 'candidate';
      }
    }

    next();
  } catch (error) {
    // Silently continue without user
    next();
  }
};

/**
 * Check if user owns the resource or has admin role
 */
const isOwnerOrAdmin = (getResourceUserId) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    const resourceUserId = typeof getResourceUserId === 'function'
      ? getResourceUserId(req)
      : getResourceUserId;

    const userRole = req.user.role?.name || req.userRole;

    if (req.userId.toString() !== resourceUserId?.toString() && userRole !== 'admin' && userRole !== 'super_admin') {
      return next(new ForbiddenError('You do not have permission to modify this resource'));
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  authorizePermission,
  optionalAuth,
  isOwnerOrAdmin,
};