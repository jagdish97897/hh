const express = require('express');
const router = express.Router();
const podController = require('../controllers/podController');

// Create a new POD entry
router.post('/pods', podController.createPod);

// Get all POD entries
router.get('/pods', podController.getAllPods);

// Get a POD entry by ID
router.get('/pods/:id', podController.getPodById);

// Update a POD entry by ID
router.put('/pods/:id', podController.updatePod);

// Delete a POD entry by ID
router.delete('/pods/:id', podController.deletePod);

module.exports = router;
