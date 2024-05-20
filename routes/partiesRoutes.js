const express = require('express');
const router = express.Router();
const { allpartiesRegistration, getCustomer1, getCustomer2} = require('../controllers/partiesController');

router.post('/partiesregistrations', allpartiesRegistration);
router.get('/getcustomer1', getCustomer1);
router.get('/getcustomer2', getCustomer2);


module.exports = router;
