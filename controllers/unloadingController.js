const DocumentType = require('../models/Unloading');

// Create a new document type entry
const createDocumentType = async (req, res) => {
    try {
        const documentType = new DocumentType(req.body);
        await documentType.save();
        res.status(201).json(documentType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all document type entries
const getAllDocumentTypes = async (req, res) => {
    try {
        const documentTypes = await DocumentType.find();
        res.json(documentTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a document type entry by ID
const getDocumentTypeById = async (req, res) => {
    try {
        const documentType = await DocumentType.findById(req.params.id);
        if (!documentType) {
            return res.status(404).json({ message: 'Document type not found' });
        }
        res.json(documentType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a document type entry by ID
const updateDocumentType = async (req, res) => {
    try {
        const documentType = await DocumentType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!documentType) {
            return res.status(404).json({ message: 'Document type not found' });
        }
        res.json(documentType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a document type entry by ID
const deleteDocumentType = async (req, res) => {
    try {
        const documentType = await DocumentType.findByIdAndDelete(req.params.id);
        if (!documentType) {
            return res.status(404).json({ message: 'Document type not found' });
        }
        res.json(documentType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDocumentType,
    getAllDocumentTypes,
    getDocumentTypeById,
    updateDocumentType,
    deleteDocumentType
};
