const express = require('express');
const router = express.Router();
const distanceController = require('../controllers/distanceController');

router.post('/distancenikalo', distanceController.getDistance);

module.exports = router;
