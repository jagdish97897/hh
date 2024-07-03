const express = require('express');
const router = express.Router();
const goodsReceiptController = require('../controllers/goodsreceiptController');

// Create a new Goods Receipt
router.post('/goods-receipts', goodsReceiptController.createGoodsReceipt);

// Get all Goods Receipts
router.get('/goods-receipts', goodsReceiptController.getAllGoodsReceipts);

// Get a Goods Receipt by ID
router.get('/goods-receipts/:id', goodsReceiptController.getGoodsReceiptById);



router.get('/goodsReceipts/consignmentno/:consignmentno', goodsReceiptController.getGoodsReceiptByConsignmentNo);

// Update a Goods Receipt by ID
router.patch('/goods-receipts/:id', goodsReceiptController.updateGoodsReceipt);

// Delete a Goods Receipt by ID
router.delete('/goods-receipts/:id', goodsReceiptController.deleteGoodsReceipt);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const goodsReceiptController = require('../controllers/goodsreceiptController');

// // Create a new Goods Receipt
// router.post('/goods-receipts', goodsReceiptController.createGoodsReceipt);

// // Get all Goods Receipts
// router.get('/goods-receipts', goodsReceiptController.getAllGoodsReceipts);

// // Get a Goods Receipt by ID
// router.get('/goods-receipts/:id', goodsReceiptController.getGoodsReceiptById);

// // Update a Goods Receipt by ID
// router.put('/goods-receipts/:id', goodsReceiptController.updateGoodsReceipt);

// // Delete a Goods Receipt by ID
// router.delete('/goods-receipts/:id', goodsReceiptController.deleteGoodsReceipt);

// module.exports = router;
