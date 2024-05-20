const VehiclePlacement = require('../models/VehiclePlacement');

// Create a new vehicle placement
const createVehiclePlacement = async (req, res) => {
    try {
        const vehiclePlacement = new VehiclePlacement(req.body);
        await vehiclePlacement.save();
        res.status(201).send(vehiclePlacement);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all vehicle placements
const getAllVehiclePlacements = async (req, res) => {
    try {
        const vehiclePlacements = await VehiclePlacement.find();
        res.send(vehiclePlacements);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a vehicle placement by ID
const getVehiclePlacementById = async (req, res) => {
    try {
        const vehiclePlacement = await VehiclePlacement.findById(req.params.id);
        if (!vehiclePlacement) {
            return res.status(404).send();
        }
        res.send(vehiclePlacement);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a vehicle placement by ID
const updateVehiclePlacement = async (req, res) => {
    try {
        const vehiclePlacement = await VehiclePlacement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehiclePlacement) {
            return res.status(404).send();
        }
        res.send(vehiclePlacement);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a vehicle placement by ID
const deleteVehiclePlacement = async (req, res) => {
    try {
        const vehiclePlacement = await VehiclePlacement.findByIdAndDelete(req.params.id);
        if (!vehiclePlacement) {
            return res.status(404).send();
        }
        res.send(vehiclePlacement);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {createVehiclePlacement, getAllVehiclePlacements, getVehiclePlacementById, updateVehiclePlacement, deleteVehiclePlacement };