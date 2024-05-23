const express = require('express');
const router = express.Router();
const { createJobOrder, getJobOrderByNumber } = require('../controllers/joborderController');

router.post('/createJobOrder', createJobOrder);
router.get('/job-orders/:jobOrder_no', getJobOrderByNumber);
module.exports = router;
