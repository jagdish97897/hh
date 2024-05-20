const BillCreate = require('../models/BillCreate');

// Create a new bill entry
const createBill = async (req, res) => {
    try {
        const bill = new BillCreate(req.body);
        await bill.save();
        res.status(201).json(bill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bill entries
const getAllBills = async (req, res) => {
    try {
        const bills = await BillCreate.find();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a bill entry by ID
const getBillById = async (req, res) => {
    try {
        const bill = await BillCreate.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a bill entry by ID
const updateBill = async (req, res) => {
    try {
        const bill = await BillCreate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(bill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a bill entry by ID
const deleteBill = async (req, res) => {
    try {
        const bill = await BillCreate.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBill,
    getAllBills,
    getBillById,
    updateBill,
    deleteBill
};
