// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Registration Controller
exports.register = async (req, res) => {
  try {
    const { username, email, password, location, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({ username, email, password, location, role });
    await newUser.save();

    // Generate a JWT token upon successful registration
    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // Allow login with either username or email

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select('+password'); // Explicitly select password

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate a JWT token upon successful login
    const token = generateToken(user._id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};