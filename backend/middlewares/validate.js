const { validationResult } = require('express-validator');
const { ValidationError } = require('../utils/errors');

/**
 * Middleware to validate request using express-validator
 * Checks for validation errors and returns a formatted response
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      }));

      throw new ValidationError(formattedErrors, 'Validation failed');
    }

    next();
  };
};

module.exports = validate;