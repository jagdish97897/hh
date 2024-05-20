const express = require('express');
const router = express.Router();
const {
    createVehiclePlacement,
    getAllVehiclePlacements,
    getVehiclePlacementById,
    updateVehiclePlacement,
    deleteVehiclePlacement
} = require('../controllers/vehicleplacementController');

// Create a new vehicle placement
router.post('/vehicle-placements', createVehiclePlacement);

// Get all vehicle placements
router.get('/vehicle-placements', getAllVehiclePlacements);

// Get a vehicle placement by ID
router.get('/vehicle-placements/:id', getVehiclePlacementById);

// Update a vehicle placement by ID
router.put('/vehicle-placements/:id', updateVehiclePlacement);

// Delete a vehicle placement by ID
router.delete('/vehicle-placements/:id', deleteVehiclePlacement);

module.exports = router;
