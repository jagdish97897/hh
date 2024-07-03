const express = require('express');
const router = express.Router();
const {createVehicleRegistration, getAllVehicleRegistrations,getVehicleRegistrationById,getVehicleRegistrationByVehicleNo, updateVehicleRegistration,deleteVehicleRegistration,   createOwner,
    getOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,
    createBroker,
    getBrokers,
    getBrokerById,
    updateBroker,
    deleteBroker,
    getDistance} = require('../controllers/vehicleRegistationController');

// Route for creating a new vehicle registration
router.post('/vehicle-registrations', createVehicleRegistration);

// Route for fetching all vehicle registrations
router.get('/vehicle-registrations', getAllVehicleRegistrations);

// Route for fetching a single vehicle registration by ID
router.get('/vehicle-registrations/:id', getVehicleRegistrationById);

router.get('/getvehicle-registrations/:vehicleNo', getVehicleRegistrationByVehicleNo);
// Route for updating a vehicle registration by ID
router.put('/vehicle-registrations/:id', updateVehicleRegistration);

// Route for deleting a vehicle registration by ID
router.delete('/vehicle-registrations/:id', deleteVehicleRegistration);


// Owner routes
router.post('/owners', createOwner);
router.get('/owners', getOwners);
router.get('/owners/:id', getOwnerById);
router.put('/owners/:id', updateOwner);
router.delete('/owners/:id', deleteOwner);

// Broker routes
router.post('/brokers', createBroker);
router.get('/brokers', getBrokers);
router.get('/brokers/:id', getBrokerById);
router.put('/brokers/:id', updateBroker);
router.delete('/brokers/:id', deleteBroker);

router.post('/distance', getDistance);

module.exports = router;
