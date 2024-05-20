const express = require('express');
const router = express.Router();
const { createJobOrder } = require('../controllers/joborderController');

router.post('/createJobOrder', createJobOrder);

module.exports = router;
