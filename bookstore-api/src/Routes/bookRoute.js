const express = require('express');
const router = express.Router();
const { 
  createBook, 
  getBooks, 
  getBookById, 
  updateBook, 
  deleteBook 
} = require('../Controllers/bookController');
const { validateBook } = require('../Middleware/validator');
const { protect } = require('../Middleware/auth');

router.route('/')
  .post(validateBook, createBook)
  .get(getBooks);

router.route('/:id')
  .get(getBookById)
  .put(validateBook, updateBook)
  .delete(deleteBook);

module.exports = router;