const GoodsReceipt = require('../models/GoodsReceipt');
const VehicleHire = require('../models/VehicleHire');
  
// Create a new Goods Receipt
const createGoodsReceipt = async (req, res) => {
    try {
        const goodsReceipt = new GoodsReceipt(req.body);
        await goodsReceipt.save();
        res.status(201).send(goodsReceipt);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all Goods Receipts
const getAllGoodsReceipts = async (req, res) => {
    try {
        const goodsReceipts = await GoodsReceipt.find();
        res.send(goodsReceipts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a Goods Receipt by ID
const getGoodsReceiptById = async (req, res) => {
    try {
        const goodsReceipt = await GoodsReceipt.findById(req.params.id);
        if (!goodsReceipt) {
            return res.status(404).send();
        }
        res.send(goodsReceipt);
    } catch (error) {
        res.status(500).send(error);
    }
};
const getGoodsReceiptByConsignmentNo = async (req, res) => {
    try {
        const goodsReceipt = await GoodsReceipt.findOne({ consignmentno: req.params.consignmentno });
        if (!goodsReceipt) {
            return res.status(404).send({ error: 'GoodsReceipt not found' });
        }
        res.send(goodsReceipt);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};




// // Update a Goods Receipt by ID
// const updateGoodsReceipt = async (req, res) => {
//     try {
//         const goodsReceipt = await GoodsReceipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!goodsReceipt) {
//             return res.status(404).send();
//         }
//         res.send(goodsReceipt);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };


// // Update a Goods Receipt by ID
// const updateGoodsReceipt = async (req, res) => {
//     const { id } = req.params;
//     const {vehiclehire_no, jobOrder_no, indentNo, from, to, consignee, consignor } = req.body;
//     try {
//         if (!vehiclehire_no || !jobOrder_no || !indentNo || !from || !to || !consignee || !consignor) {
//             return res.status(400).json({ errorMessage: 'Please provide all required fields' });
//           }

//           const vehicleHireDetails = vehiclehire_no ? await getVehicleHireDetails(vehiclehire_no) : {};


//           const updatedFields = {
//             jobOrder_no,
//             vehiclehire_no,
//             PAN:vehicleHireDetails.PAN || PAN,
//             vehicle_placement_no,
//             vehicleNo,
//             broker,
//             loadType,
//             indentNo,
//             from,
//             to,
//             consignee,
//             consignor,

//           };

          
//           const updatedGoodsReceipt = await GoodsReceipt.findByIdAndUpdate(id, updatedFields, { new: true });
//           if (!updatedGoodsReceipt) {
//             return res.status(404).json({ errorMessage: 'Goods Receipt not found' });
//           }

//         res.send(goodsReceipt);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };


const updateGoodsReceipt = async (req, res) => {
    const { id } = req.params;
    const { consignmentno, jobOrder_no, from, to, consignee, consignor, vehiclehire_no } = req.body;

    try {
        if (!consignmentno || !jobOrder_no || !from || !to || !consignee || !consignor) {
            return res.status(400).json({ errorMessage: 'Please provide all required fields' });
        }

        // Retrieve vehicle hire details if vehiclehire_no is provided
        let vehicleHireDetails = {};
        if (vehiclehire_no) {
            vehicleHireDetails = await VehicleHire.findOne({vehiclehire_no});
        }

        // Update the fields with provided data and vehicle hire details
        const updatedFields = {
            jobOrder_no,
            vehiclehire_no,
            from,
            to,
            consignee,
            consignor,
            vehicleHireCharges:vehicleHireDetails.charges,
        };

        // Find and update the goods receipt by ID
        const updatedGoodsReceipt = await GoodsReceipt.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedGoodsReceipt) {
            return res.status(404).json({ errorMessage: 'Goods Receipt not found' });
        }

        res.json(updatedGoodsReceipt);
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
};


// Delete a Goods Receipt by ID
const deleteGoodsReceipt = async (req, res) => {
    try {
        const goodsReceipt = await GoodsReceipt.findByIdAndDelete(req.params.id);
        if (!goodsReceipt) {
            return res.status(404).send();
        }
        res.send(goodsReceipt);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { createGoodsReceipt, getAllGoodsReceipts, getGoodsReceiptById, getGoodsReceiptByConsignmentNo, updateGoodsReceipt, deleteGoodsReceipt };


// const GoodsReceipt = require('../models/GoodsReceipt');
// const axios = require('axios');

// const createGoodsReceipt = async (req, res) => {
//     try {
//         const { consignmentno, vehicle_placement_no, date, container, cod, additem } = req.body;

//         // Function to fetch distance between origin and destination
//         const fetchDistance = async (origin, destination) => {
//             const apiKey = 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'; 
//             const response = await axios.get(
//                 'https://maps.googleapis.com/maps/api/distancematrix/json',
//                 {
//                     params: {
//                         origins: origin,
//                         destinations: destination,
//                         key: apiKey
//                     }
//                 }
//             );

//             if (!response.data || response.data.status !== 'OK' || response.data.rows[0].elements[0].status !== 'OK') {
//                 throw new Error(`Invalid response for destination ${destination}`);
//             }

//             return response.data.rows[0].elements[0].distance.text;
//         };

//         // // Iterate over additem array and fetch distances
//         // for (let item of additem) {
//         //     if (!Array.isArray(item.to)) {
//         //         throw new Error('Destination list should be an array');
//         //     }

//         //     const distances = [];

//         //     // Fetch distance for each destination in item.to
//         //     for (const destination of item.to) {
//         //         const distance = await fetchDistance(item.from, destination);
//         //         distances.push({ destination, distance });
//         //     }

//         //     item.to = distances; // Update item.to with fetched distances
//         // }


//         for (let item of additem) {
//             if (!Array.isArray(item.to)) {
//               throw new Error('destinationPincodes should be an array for item with sourcePincode ' + item.from);
//             }
//             const distances = [];
//             let previousPincode = item.from;
            
//             for (const destinationPincode of item.to) {
//               const distance = await fetchDistance(previousPincode, destinationPincode);
//               distances.push({ destination: destinationPincode, distance });
//               previousPincode = destinationPincode; // Update the previousPincode to the current destination
//             }
//             item.to = distances;
//           }

//         // Create a new GoodsReceipt object
//         const goodsReceipt = new GoodsReceipt({
//             consignmentno,
//             vehicle_placement_no,
//             date,
//             container,
//             cod,
//             additem
//         });

//         // Save the GoodsReceipt object to the database
//         await goodsReceipt.save();

//         res.status(201).send(goodsReceipt);
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// };


// // Get all Goods Receipts
// const getAllGoodsReceipts = async (req, res) => {
//     try {
//         const goodsReceipts = await GoodsReceipt.find();
//         res.send(goodsReceipts);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Get a Goods Receipt by ID
// const getGoodsReceiptById = async (req, res) => {
//     try {
//         const goodsReceipt = await GoodsReceipt.findById(req.params.id);
//         if (!goodsReceipt) {
//             return res.status(404).send();
//         }
//         res.send(goodsReceipt);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Update a Goods Receipt by ID
// const updateGoodsReceipt = async (req, res) => {
//     try {
//         const goodsReceipt = await GoodsReceipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!goodsReceipt) {
//             return res.status(404).send();
//         }
//         res.send(goodsReceipt);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// // Delete a Goods Receipt by ID
// const deleteGoodsReceipt = async (req, res) => {
//     try {
//         const goodsReceipt = await GoodsReceipt.findByIdAndDelete(req.params.id);
//         if (!goodsReceipt) {
//             return res.status(404).send();
//         }
//         res.send(goodsReceipt);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// module.exports = { createGoodsReceipt, getAllGoodsReceipts, getGoodsReceiptById, updateGoodsReceipt, deleteGoodsReceipt };
