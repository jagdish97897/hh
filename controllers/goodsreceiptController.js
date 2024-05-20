const GoodsReceipt = require('../models/GoodsReceipt');

// Create a new Goods Receipt
const createGoodsReceipt = async (req, res) => {
    try {
        const goodsReceipt = new GoodsReceipt(req.body);
        await goodsReceipt.save();
        res.status(201).send(goodsReceipt);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all Goods Receipts
const getAllGoodsReceipts = async (req, res) => {
    try {
        const goodsReceipts = await GoodsReceipt.find();
        res.send(goodsReceipts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a Goods Receipt by ID
const getGoodsReceiptById = async (req, res) => {
    try {
        const goodsReceipt = await GoodsReceipt.findById(req.params.id);
        if (!goodsReceipt) {
            return res.status(404).send();
        }
        res.send(goodsReceipt);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a Goods Receipt by ID
const updateGoodsReceipt = async (req, res) => {
    try {
        const goodsReceipt = await GoodsReceipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!goodsReceipt) {
            return res.status(404).send();
        }
        res.send(goodsReceipt);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a Goods Receipt by ID
const deleteGoodsReceipt = async (req, res) => {
    try {
        const goodsReceipt = await GoodsReceipt.findByIdAndDelete(req.params.id);
        if (!goodsReceipt) {
            return res.status(404).send();
        }
        res.send(goodsReceipt);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { createGoodsReceipt, getAllGoodsReceipts, getGoodsReceiptById, updateGoodsReceipt, deleteGoodsReceipt };
