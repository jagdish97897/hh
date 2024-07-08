const express = require('express');
const router = express.Router();
const vehicleHireController = require('../controllers/vehiclehireController');

// Create a new vehicle hire entry
router.post('/vehicle-hires', vehicleHireController.createVehicleHire);

// Get all vehicle hire entries
router.get('/vehicle-hires', vehicleHireController.getAllVehicleHires);

// Get a vehicle hire entry by ID
router.get('/vehicle-hires/:id', vehicleHireController.getVehicleHireById);

router.get('/vehicleHires/vehiclehire_no/:vehiclehire_no', vehicleHireController.getVehicleDetailsByVehicleHireNo);
// Update a vehicle hire entry by ID
router.patch('/vehicle-hires/:id', vehicleHireController.updateVehicleHire);

// Delete a vehicle hire entry by ID
router.delete('/vehicle-hires/:id', vehicleHireController.deleteVehicleHire);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const vehicleHireController = require('../controllers/vehiclehireController');

// // Create a new vehicle hire entry
// router.post('/vehicle-hires', vehicleHireController.createVehicleHire);

// // Get all vehicle hire entries
// router.get('/vehicle-hires', vehicleHireController.getAllVehicleHires);

// // Get a vehicle hire entry by ID
// router.get('/vehicle-hires/:id', vehicleHireController.getVehicleHireById);

// // Update a vehicle hire entry by ID
// router.put('/vehicle-hires/:id', vehicleHireController.updateVehicleHire);

// // Delete a vehicle hire entry by ID
// router.delete('/vehicle-hires/:id', vehicleHireController.deleteVehicleHire);

// module.exports = router;
