const { body } = require('express-validator');

// User registration validation
exports.validateUserReg = [
  body('email')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// User login validation
exports.validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Book validation
exports.validateBook = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .trim(),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .trim(),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('rating')
    .isNumeric()
    .withMessage('Rating must be a number')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('publishedDate')
    .isISO8601()
    .withMessage('Published date must be a valid date')
];