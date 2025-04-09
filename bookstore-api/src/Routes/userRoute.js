const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../Controllers/userController');
const { validateUserReg, validateUserLogin } = require('../Middleware/validator');

router.post('/signup', validateUserReg, registerUser);
router.post('/login', validateUserLogin, loginUser);


module.exports = router;