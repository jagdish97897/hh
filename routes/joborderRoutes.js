const express = require('express');
const router = express.Router();
const { createJobOrder, getJobOrderByNumber, getAllJobOrders,updateJobOrderById,getJobOrderById,updateJobOrderByJobOrderNo } = require('../controllers/joborderController');

router.post('/createJobOrder', createJobOrder);
router.get('/job-orders/:jobOrder_no', getJobOrderByNumber);
router.get('/get-all-job-orders', getAllJobOrders);
router.patch('/updatejoborder/:id', updateJobOrderById);
router.put('/updatejoborder/:jobOrder_no', updateJobOrderByJobOrderNo);
router.get('/getjoborderbyid/:id', getJobOrderById); 
module.exports = router;
