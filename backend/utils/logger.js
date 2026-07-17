const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logDir = process.env.LOG_FILE_PATH || './logs';

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack || ''} ${metaStr}`;
  })
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${message} ${stack || ''}`;
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 10,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'http.log'),
      level: 'http',
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// Add console transport in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: consoleFormat,
    level: 'debug',
  }));
}

// Create a stream object for Morgan
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

// Add request context helper
logger.withRequest = (req) => {
  return {
    info: (message, meta = {}) => {
      logger.info(message, {
        ...meta,
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userId: req.user?._id,
      });
    },
    error: (message, meta = {}) => {
      logger.error(message, {
        ...meta,
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userId: req.user?._id,
      });
    },
    warn: (message, meta = {}) => {
      logger.warn(message, {
        ...meta,
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userId: req.user?._id,
      });
    },
  };
};

module.exports = logger;