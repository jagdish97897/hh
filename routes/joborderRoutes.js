const express = require('express');
const router = express.Router();
const { createJobOrder, getJobOrderByNumber, getAllJobOrders,updateJobOrderById,getJobOrderById } = require('../controllers/joborderController');

router.post('/createJobOrder', createJobOrder);
router.get('/job-orders/:jobOrder_no', getJobOrderByNumber);
router.get('/get-all-job-orders', getAllJobOrders);
router.put('/updatejoborder/:id', updateJobOrderById);
router.get('/getjoborderbyid/:id', getJobOrderById); 
module.exports = router;
