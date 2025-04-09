const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userschema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// check if password is correct
userschema.methods.matchPassword = async function(PasswordGiven) {
  return await bcrypt.compare(PasswordGiven, this.password);
};

const User = mongoose.model('User', userschema);
module.exports = User;