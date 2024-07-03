// controllers/indentController.js

const Indent = require('../models/Indent');

const createIndent = async (req, res) => {
  const {
    indentNo,
    date,
    customer,
    orderNo,
    orderDate,
    orderMode,
    serviceMode,
    rfq,
    expectedDate,
    employee,
    other,
    additem
  } = req.body;

  try {
    // Simple validation
    if (!indentNo || !date || !customer || !orderNo || !orderDate || !orderMode || !serviceMode || !rfq || !expectedDate || !employee || !additem) {
      return res.status(400).json({ errorMessage: 'Please provide all required fields' });
    }

    // Create a new indent
    const newIndent = new Indent({
      indentNo,
      date,
      customer,
      orderNo,
      orderDate,
      orderMode,
      serviceMode,
      rfq,
      expectedDate,
      employee,
      other,
      additem
    });

    const savedIndent = await newIndent.save();

    res.status(201).json(savedIndent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};


const getAllIndents = async (req, res) => {
  try {
    // Fetch all indents from the database
    const allIndents = await Indent.find();

    res.status(200).json(allIndents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};


const updateIndent = async (req, res) => {
  const { id } = req.params;
  const {
    indentNo,
    date,
    customer,
    balance,
    orderNo,
    orderDate,
    orderMode,
    serviceMode,
    rfq,
    orderType,
    expectedDate,
    employee,
    source,
    destination,
    additem
  } = req.body;

  try {
    // Check if the indent exists
    const existingIndent = await Indent.findById(id);
    if (!existingIndent) {
      return res.status(404).json({ errorMessage: 'Indent not found' });
    }

    // Update the indent fields
    existingIndent.indentNo = indentNo;
    existingIndent.date = date;
    existingIndent.customer = customer;
    existingIndent.balance = balance;
    existingIndent.orderNo = orderNo;
    existingIndent.orderDate = orderDate;
    existingIndent.orderMode = orderMode;
    existingIndent.serviceMode = serviceMode;
    existingIndent.rfq = rfq;
    existingIndent.orderType = orderType;
    existingIndent.expectedDate = expectedDate;
    existingIndent.employee = employee;
    existingIndent.source = source;
    existingIndent.destination = destination;
    existingIndent.additem = additem;

    // Save the updated indent
    const updatedIndent = await existingIndent.save();

    res.status(200).json(updatedIndent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

const getIndentById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the indent by ID
    const indent = await Indent.findById(id);
    
    // Check if the indent exists
    if (!indent) {
      return res.status(404).json({ errorMessage: 'Indent not found' });
    }

    // If the indent exists, return it
    res.status(200).json(indent);
  } catch (error) {
    console.error(error);
    res.status(500).json({errorMessage: 'Server Error' });
  }
};

const getIndentByIndentNo = async (req, res) => {
  const { indentNo } = req.params;

  try {
    // Find the indent by indentNo
    const indent = await Indent.findOne({ indentNo });
    
    // Check if the indent exists
    if (!indent) {
      return res.status(404).json({ errorMessage: 'Indent not found' });
    }

    // If the indent exists, return it
    res.status(200).json(indent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};



module.exports = { createIndent, getAllIndents, updateIndent, getIndentById, getIndentByIndentNo};
