const Book = require('../Models/Book');
const { validateResult } = require('express-validator');

exports.createBook = async (req, res) => {
  const errors = validateResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, author, category, price, rating, publishdate } = req.body;

  try {
    const book = new Book({
      title,
      author,
      category,
      price,
      rating,
      publishdate
    });

    const createdBook = await book.save();

    res.status(201).json({
      success: true,
      book: createdBook
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;


    let query = {};

    if (req.query.author) {
      query.author = req.query.author;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.rating) {
      query.rating = { $gte: parseFloat(req.query.rating) };
    }
    

    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: 'i' };
    }
    
    // Sort
    let sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      for (const field of sortFields) {
        if (field.startsWith('-')) {
          sort[field.substring(1)] = -1;
        } else {
          sort[field] = 1;
        }
      }
    } else {
      sort = { createdAt: -1 }; 
    }

  
    const books = await Book.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip);

 
    const count = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      page,
      pages: Math.ceil(count / limit),
      books
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    console.error(error);
    
   
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.updateBook = async (req, res) => {
  const errors = validateResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  try {
    const { title, author, category, price, rating, publishdate } = req.body;
    
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.price = price !== undefined ? price : book.price;
    book.rating = rating !== undefined ? rating : book.rating;
    book.publishdate = publishdate || book.publishdate;

    const updatedBook = await book.save();

    res.status(200).json({
      success: true,
      book: updatedBook
    });
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Book removed'
    });
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};