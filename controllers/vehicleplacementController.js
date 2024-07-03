const VehiclePlacement = require('../models/VehiclePlacement');

// Create a new vehicle placement
const createVehiclePlacement = async (req, res) => {
    try {
        const vehiclePlacement = new VehiclePlacement(req.body);
        console.log(req)
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

const getVehiclePlacementByNumber = async (req, res) => {
    try {
        const vehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no: req.params.vehicle_placement_no });
        if (!vehiclePlacement) {
            return res.status(404).send({ message: "Vehicle placement not found" });
        }
        res.send(vehiclePlacement);
    } catch (error) {
        res.status(500).send({ message: "An error occurred while fetching the vehicle placement", error });
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


module.exports = {createVehiclePlacement, getAllVehiclePlacements, getVehiclePlacementById,getVehiclePlacementByNumber, updateVehiclePlacement, deleteVehiclePlacement };



// const VehiclePlacement = require('../models/VehiclePlacement');

// const createVehiclePlacement = async (req, res) => {
//     try {
//         // Extract necessary fields from the request body
//         const { vehicle_placement_no, date, jobOrder_no } = req.body;

//         // Check if all required fields are provided
//         if (!vehicle_placement_no || !date || !jobOrder_no) {
//             return res.status(400).json({ error: 'All required fields must be provided' });
//         }

//         // Create a new vehicle placement document
//         const vehiclePlacement = new VehiclePlacement(req.body);

//         // Save the new vehicle placement document
//         await vehiclePlacement.save();

//         // Send the created vehicle placement as the response
//         res.status(201).json(vehiclePlacement);
//     } catch (error) {
//         // Handle errors
//         console.error('Error creating vehicle placement:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // const createVehiclePlacement = async (req, res) => {
// //     try {
// //         // Validate the request body
// //         const requiredFields = ['vehicleNo', 'placementDate', 'location']; // Add other required fields as necessary
// //         for (const field of requiredFields) {
// //             if (!req.body[field]) {
// //                 return res.status(400).send({ error: `${field} is required` });
// //             }
// //         }
// //         const vehiclePlacement = new VehiclePlacement(req.body);
// //         await vehiclePlacement.save();
// //         res.status(201).send(vehiclePlacement);
// //     } catch (error) {
// //         console.error('Error creating vehicle placement:', error);

// //         if (error.name === 'ValidationError') {
// //             return res.status(400).send({ error: 'Validation Error', details: error.errors });
// //         }

// //         res.status(500).send({ error: 'Server Error', message: error.message });
// //     }
// // };


// // Create a new vehicle placement
// // const createVehiclePlacement = async (req, res) => {
// //     try {
// //         const vehiclePlacement = new VehiclePlacement(req.body);
// //         await vehiclePlacement.save();
// //         res.status(201).send(vehiclePlacement);
// //     } catch (error) {
// //         res.status(400).send(error);
// //     }
// // };

// // Get all vehicle placements
// const getAllVehiclePlacements = async (req, res) => {
//     try {
//         const vehiclePlacements = await VehiclePlacement.find();
//         res.send(vehiclePlacements);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Get a vehicle placement by ID
// const getVehiclePlacementById = async (req, res) => {
//     try {
//         const vehiclePlacement = await VehiclePlacement.findById(req.params.id);
//         if (!vehiclePlacement) {
//             return res.status(404).send();
//         }
//         res.send(vehiclePlacement);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Update a vehicle placement by ID
// const updateVehiclePlacement = async (req, res) => {
//     try {
//         const vehiclePlacement = await VehiclePlacement.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!vehiclePlacement) {
//             return res.status(404).send();
//         }
//         res.send(vehiclePlacement);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// // Delete a vehicle placement by ID
// const deleteVehiclePlacement = async (req, res) => {
//     try {
//         const vehiclePlacement = await VehiclePlacement.findByIdAndDelete(req.params.id);
//         if (!vehiclePlacement) {
//             return res.status(404).send();
//         }
//         res.send(vehiclePlacement);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };


// module.exports = {createVehiclePlacement, getAllVehiclePlacements, getVehiclePlacementById, updateVehiclePlacement, deleteVehiclePlacement };