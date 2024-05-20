const SupplyChainPartner = require('../models/SupplyChainPartner');

// Controller function to handle creating a new supply chain partner
const createSupplyChainPartner = async (req, res) => {
    try {
        const newSupplyChainPartner = await SupplyChainPartner.create(req.body);
        res.status(201).json(newSupplyChainPartner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Controller function to get all brokers
const getBrokers = async (req, res) => {
    try {
        const brokers = await SupplyChainPartner.find({ type: 'Broker' });
        res.status(200).json(brokers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all owners
const getOwners = async (req, res) => {
    try {
        const owners = await SupplyChainPartner.find({ type: 'Owner' });
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// const getOwners = async (req, res) => {
//     try {
//         const { name } = req.query;
//         const query = { type: 'Owner' };

//         if (name) {
//             query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
//         }

//         const owners = await SupplyChainPartner.find(query);
//         res.status(200).json(owners);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
module.exports = {
    createSupplyChainPartner, getBrokers, getOwners
};
