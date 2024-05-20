// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const registerUser = (req, res) => {
  const { username, password,mobile } = req.body;

  // Simple validation
  if (!username || !password || !mobile) {
    return res.status(400).json({ errorMessage: 'Please enter all fields' });
  }
  // Check for existing user
  User.findOne({ username })
    .then(user => {
      if (user) return res.status(400).json({ errorMessage: 'User already exists' });

      const newUser = new User({
        username,
        password,
        mobile
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json({ title: 'Registration Successful' }))
            .catch(err => console.log(err));
        });
      });
    });
};

// Get user data by username
const getUserDataByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username }, { password: 0 }); // Exclude password field
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server error' });
  }
};

// Get all user data
const getAllUserData = async (req, res) => {
  try {
    const allUsers = await User.find({}, { password: 0 }); // Exclude password field
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server error' });
  }
};
// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ errorMessage: 'Please enter all fields' });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ errorMessage: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errorMessage: 'Invalid credentials' });
    }

    // User matched, create JWT payload
    const payload = {
      username: user.username,
      password: user.password
    };
    // Sign token with expiration of 7 days
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use your own secret key from environment variables
      { expiresIn: '7d' }, // Token expires in 7 days
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: 'Bearer ' + token
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server error' });
  }
};


module.exports = { registerUser, getUserDataByUsername, getAllUserData, loginUser };

