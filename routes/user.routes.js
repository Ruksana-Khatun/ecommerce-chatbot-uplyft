const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const userMiddleware = require('../middleware/userMiddleware.js'); // ✅ Correct

const { registerUser, loginUser } = require('../controllers/user.controller.js');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;


