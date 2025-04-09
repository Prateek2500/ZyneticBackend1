const jwtToken = require('jsonwebtoken');

const generateToken = (id) => {
  return jwtToken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

module.exports = generateToken;