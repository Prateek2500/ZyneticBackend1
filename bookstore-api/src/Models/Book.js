const mongoose = require('mongoose');

const bookschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5']
  },
  date: {
    type: Date,
    required: [true, 'Published date is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

bookschema.index({ title: 'text' });
bookschema.index({ author: 1 });
bookschema.index({ category: 1 });
bookschema.index({ rating: 1 });

const Book = mongoose.model('Book', bookschema);
module.exports = Book;