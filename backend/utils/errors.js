class AppError extends Error {
  constructor(message, statusCode, errorCode = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad request', errorCode = 'BAD_REQUEST') {
    super(message, 400, errorCode);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', errorCode = 'UNAUTHORIZED') {
    super(message, 401, errorCode);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access', errorCode = 'FORBIDDEN') {
    super(message, 403, errorCode);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found', errorCode = 'NOT_FOUND') {
    super(message, 404, errorCode);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource conflict', errorCode = 'CONFLICT') {
    super(message, 409, errorCode);
  }
}

class ValidationError extends AppError {
  constructor(errors, message = 'Validation failed', errorCode = 'VALIDATION_ERROR') {
    super(message, 422, errorCode);
    this.errors = errors;
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests', errorCode = 'RATE_LIMIT') {
    super(message, 429, errorCode);
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal server error', errorCode = 'SERVER_ERROR') {
    super(message, 500, errorCode);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  TooManyRequestsError,
  InternalServerError,
};