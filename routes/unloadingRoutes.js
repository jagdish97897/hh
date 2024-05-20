const express = require('express');
const router = express.Router();
const documentTypeController = require('../controllers/unloadingController');

// Route for creating a new document type entry
router.post('/documentTypes', documentTypeController.createDocumentType);

// Route for getting all document type entries
router.get('/documentTypes', documentTypeController.getAllDocumentTypes);

// Route for getting a document type entry by ID
router.get('/documentTypes/:id', documentTypeController.getDocumentTypeById);

// Route for updating a document type entry by ID
router.put('/documentTypes/:id', documentTypeController.updateDocumentType);

// Route for deleting a document type entry by ID
router.delete('/documentTypes/:id', documentTypeController.deleteDocumentType);

module.exports = router;
