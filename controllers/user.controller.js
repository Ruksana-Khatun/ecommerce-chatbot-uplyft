const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};
exports.registerUser = async (req, res) => {
  try {
    const {fullName,email, password } = req.body;

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const user = new User({ fullName,email, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Should show: RUKSANAKHATUN124

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = generateToken(user);
    res.status(200).json({ token, message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};