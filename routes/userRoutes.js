// routes/registerRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST /register
// @desc    Register user
// @access  Public
router.post('/register', userController.registerUser);
router.get('/getuserdata/:username', userController.getUserDataByUsername)
router.get('/getAllUserData', userController.getAllUserData)
router.post('/login', userController.loginUser)
module.exports = router;
