const express = require('express');
const router = express.Router();
const { createFreightRate,getAllFreightRates,updateFreightRateById,getFreightRateById} = require('../controllers/rateController');

router.post('/freightrate', createFreightRate);
router.get('/viewfreightrates', getAllFreightRates);
router.put('/updatefreightrate/:id', updateFreightRateById);
router.get('/viewfreightrate/:id', getFreightRateById);

module.exports = router;
