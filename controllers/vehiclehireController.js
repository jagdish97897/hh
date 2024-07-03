
const VehicleHire = require('../models/VehicleHire');

// Create a new vehicle hire entry
const createVehicleHire = async (req, res) => {
    try {
        const vehicleHire = new VehicleHire(req.body);
        await vehicleHire.save();
        res.status(201).send(vehicleHire);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all vehicle hire entries
const getAllVehicleHires = async (req, res) => {
    try {
        const vehicleHires = await VehicleHire.find();
        res.send(vehicleHires);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a vehicle hire entry by ID
const getVehicleHireById = async (req, res) => {
    try {
        const vehicleHire = await VehicleHire.findById(req.params.id);
        if (!vehicleHire) {
            return res.status(404).send();
        }
        res.send(vehicleHire);
    } catch (error) {
        res.status(500).send(error);
    }
};


const getVehicleDetailsByVehicleHireNo = async (req, res) => {
    try {
        const vehicleHire = await VehicleHire.findOne({ vehiclehire_no: req.params.vehiclehire_no });
        if (!vehicleHire) {
            return res.status(404).send({ error: 'VehicleHire not found' });
        }
        res.send(vehicleHire);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateVehicleHire = async (req, res) => {
    try {
        const vehicleHire = await VehicleHire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicleHire) {
            return res.status(404).send();
        }
        res.send(vehicleHire);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a vehicle hire entry by ID
const deleteVehicleHire = async (req, res) => {
    try {
        const vehicleHire = await VehicleHire.findByIdAndDelete(req.params.id);
        if (!vehicleHire) {
            return res.status(404).send();
        }
        res.send(vehicleHire);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createVehicleHire,
    getAllVehicleHires,
    getVehicleDetailsByVehicleHireNo,
    getVehicleHireById,
    updateVehicleHire,
    deleteVehicleHire
};



// const VehicleHire = require('../models/VehicleHire');

// // Create a new vehicle hire entry
// const createVehicleHire = async (req, res) => {
//     try {
//         const vehicleHire = new VehicleHire(req.body);
//         await vehicleHire.save();
//         res.status(201).send(vehicleHire);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// // Get all vehicle hire entries
// const getAllVehicleHires = async (req, res) => {
//     try {
//         const vehicleHires = await VehicleHire.find();
//         res.send(vehicleHires);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Get a vehicle hire entry by ID
// const getVehicleHireById = async (req, res) => {
//     try {
//         const vehicleHire = await VehicleHire.findById(req.params.id);
//         if (!vehicleHire) {
//             return res.status(404).send();
//         }
//         res.send(vehicleHire);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Update a vehicle hire entry by ID
// const updateVehicleHire = async (req, res) => {
//     try {
//         const vehicleHire = await VehicleHire.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!vehicleHire) {
//             return res.status(404).send();
//         }
//         res.send(vehicleHire);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// // Delete a vehicle hire entry by ID
// const deleteVehicleHire = async (req, res) => {
//     try {
//         const vehicleHire = await VehicleHire.findByIdAndDelete(req.params.id);
//         if (!vehicleHire) {
//             return res.status(404).send();
//         }
//         res.send(vehicleHire);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// module.exports = {
//     createVehicleHire,
//     getAllVehicleHires,
//     getVehicleHireById,
//     updateVehicleHire,
//     deleteVehicleHire
// };
