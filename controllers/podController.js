const Pod = require('../models/Pod');

// Create a new POD entry
const createPod = async (req, res) => {
    try {
        const pod = new Pod(req.body);
        await pod.save();
        res.status(201).json(pod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all POD entries
const getAllPods = async (req, res) => {
    try {
        const pods = await Pod.find();
        res.json(pods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a POD entry by ID
const getPodById = async (req, res) => {
    try {
        const pod = await Pod.findById(req.params.id);
        if (!pod) {
            return res.status(404).json({ message: 'POD not found' });
        }
        res.json(pod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPodByPodNo = async (req, res) => {
    try {
        const pod = await Pod.findOne({ podNo: req.params.podNo });
        if (!pod) {
            return res.status(404).json({ message: 'POD not found' });
        }
        res.json(pod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a POD entry by ID
const updatePod = async (req, res) => {
    try {
        const pod = await Pod.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pod) {
            return res.status(404).json({ message: 'POD not found' });
        }
        res.json(pod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a POD entry by ID
const deletePod = async (req, res) => {
    try {
        const pod = await Pod.findByIdAndDelete(req.params.id);
        if (!pod) {
            return res.status(404).json({ message: 'POD not found' });
        }
        res.json(pod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPod,
    getAllPods,
    getPodById,
    updatePod,
    deletePod,
    getPodByPodNo
};
