const JobOrder = require('../models/JobOrder');
const Indent = require('../models/Indent');

const createJobOrder = async (req, res) => {
  const { jobOrder_no, indentNo, from, to, consignee, consignor} = req.body;

  try {
    // Simple validation
    if (!jobOrder_no || !indentNo || !from || !to || !consignee || !consignor) {
      return res.status(400).json({ errorMessage: 'Please provide all required fields' });
    }

    // Check if the indent exists using indentNo
    const indent = await Indent.findOne({ indentNo });

    if (!indent) {
      return res.status(404).json({ errorMessage: 'Indent not found' });
    }

    // Validate that the provided 'from' and 'to' match one of the routes in the indent
    const isValidRoute = indent.additem.some(item => item.from === from && item.to === to);
    if (!isValidRoute) {
      return res.status(400).json({ errorMessage: 'Invalid route. Please select a valid "from" and "to" combination.' });
    }

    // Create a new job order
    const newJobOrder = new JobOrder({ jobOrder_no, indentNo, from, to, consignee, consignor });
    const savedJobOrder = await newJobOrder.save();

    res.status(201).json(savedJobOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

const getJobOrderByNumber = async (req, res) => {
  const { jobOrder_no } = req.params;

  try {
    // Find job order by jobOrder_no
    const jobOrder = await JobOrder.findOne({ jobOrder_no });

    if (!jobOrder) {
      return res.status(404).json({ errorMessage: 'Job Order not found' });
    }

    res.status(200).json(jobOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

const getAllJobOrders = async (req, res) => {
  try {
    // Fetch all job orders
    const jobOrders = await JobOrder.find();

    res.status(200).json(jobOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};


const updateJobOrderById = async (req, res) => {
  const { id } = req.params;
  const { jobOrder_no, indentNo, from, to, consignee, consignor } = req.body;

  try {
    // Simple validation
    if (!jobOrder_no || !indentNo || !from || !to || !consignee || !consignor) {
      return res.status(400).json({ errorMessage: 'Please provide all required fields' });
    }

    // Check if the indent exists using indentNo
    const indent = await Indent.findOne({ indentNo });

    if (!indent) {
      return res.status(404).json({ errorMessage: 'Indent not found' });
    }

    // Validate that the provided 'from' and 'to' match one of the routes in the indent
    const isValidRoute = indent.additem.some(item => item.from === from && item.to === to);
    if (!isValidRoute) {
      return res.status(400).json({ errorMessage: 'Invalid route. Please select a valid "from" and "to" combination.' });
    }

    // Find the job order by ID and update it
    const updatedJobOrder = await JobOrder.findByIdAndUpdate(id, { jobOrder_no, indentNo, from, to, consignee, consignor }, { new: true });

    if (!updatedJobOrder) {
      return res.status(404).json({ errorMessage: 'Job Order not found' });
    }

    res.status(200).json(updatedJobOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

const getJobOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find job order by ID
    const jobOrder = await JobOrder.findById(id);

    if (!jobOrder) {
      return res.status(404).json({ errorMessage: 'Job Order not found' });
    }

    res.status(200).json(jobOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};


module.exports = { createJobOrder, getJobOrderByNumber,getAllJobOrders, updateJobOrderById, getJobOrderById };

