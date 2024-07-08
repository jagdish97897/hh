const express = require('express');
const router = express.Router();
const billController = require('../controllers/billcreateController');

// Route to create a new bill entry
router.post('/bills', billController.createBill);

// Route to get all bill entries
router.get('/getbills', billController.getAllBills);

// Route to get a bill entry by ID
router.get('/bills/:id', billController.getBillById);

// Route to update a bill entry by ID
router.patch('/bills/:id', billController.updateBill);

// Route to delete a bill entry by ID
router.delete('/bills/:id', billController.deleteBill);

module.exports = router;
