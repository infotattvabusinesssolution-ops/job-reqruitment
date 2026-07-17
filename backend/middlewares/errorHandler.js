const logger = require('../utils/logger');
const { AppError, ValidationError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Log the error
  const logContext = {
    requestId: req.id,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?._id,
    errorCode: error.errorCode,
    statusCode: error.statusCode || 500,
  };

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new AppError(message, 404, 'INVALID_ID');
    logger.warn(message, logContext);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value: ${field}. Please use another value.`;
    error = new AppError(message, 409, 'DUPLICATE_KEY');
    logger.warn(message, logContext);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message,
    }));
    error = new ValidationError(errors, 'Validation failed');
    logger.warn('Validation Error', { ...logContext, errors });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401, 'INVALID_TOKEN');
    logger.warn('JWT Error', logContext);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401, 'TOKEN_EXPIRED');
    logger.warn('Token Expired', logContext);
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError('File too large', 400, 'FILE_TOO_LARGE');
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error = new AppError('Too many files', 400, 'TOO_MANY_FILES');
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new AppError('Unexpected file field', 400, 'UNEXPECTED_FILE');
  }

  // Express validator errors
  if (err.array && typeof err.array === 'function') {
    const errors = err.array().map(e => ({
      field: e.path,
      message: e.msg,
    }));
    error = new ValidationError(errors, 'Validation failed');
  }

  // Default to 500 if status code not set
  const statusCode = error.statusCode || 500;
  const errorCode = error.errorCode || 'INTERNAL_ERROR';

  // Log 500 errors as they might be unexpected
  if (statusCode === 500) {
    logger.error('Internal Server Error', {
      ...logContext,
      stack: error.stack,
      message: error.message,
    });
  }

  // Send response
  const response = {
    success: false,
    message: error.message || 'Internal server error',
    errorCode,
    timestamp: new Date().toISOString(),
    requestId: req.id,
  };

  // Add validation errors if present
  if (error.errors) {
    response.errors = error.errors;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;