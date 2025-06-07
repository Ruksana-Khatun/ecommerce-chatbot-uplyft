const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User registration route
router.post("/register",registerUser);
router.post("/login",loginUser);
