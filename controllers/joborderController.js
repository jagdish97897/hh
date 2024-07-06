const JobOrder = require('../models/JobOrder');
const Indent = require('../models/Indent');
const Parties = require('../models/Parties'); // Import the Parties model
const VehiclePlacement = require('../models/VehiclePlacement');

const createJobOrder = async (req, res) => {
  const { jobOrder_no,vehicle_placement_no, indentNo, from, to, consignee, consignor} = req.body;

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
    const newJobOrder = new JobOrder({ jobOrder_no,vehicle_placement_no, indentNo, from, to, consignee, consignor });
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
  const { jobOrder_no, vehicle_placement_no, vehicleNo, broker,loadType, indentNo, from, to, consignee, consignor } = req.body;

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

    // Validate and auto-fill consignor details from Customer2
    let consignorData;
    if (consignor) {
      consignorData = await Parties.findOne({ name: consignor, type: 'Customer2' });
      if (!consignorData) {
        return res.status(404).json({ errorMessage: 'Consignor not found in Customer2 data' });
      }
    }

    // Validate and auto-fill consignee details from Customer2
    let consigneeData;
    if (consignee) {
      consigneeData = await Parties.findOne({ name: consignee, type: 'Customer2' });
      if (!consigneeData) {
        return res.status(404).json({ errorMessage: 'Consignee not found in Customer2 data' });
      }
    }

    // Auto-fill the additional fields from the matching item
    const matchedItem = indent.additem.find(item => item.from === from && item.to === to);
    if (!matchedItem) {
      return res.status(400).json({ errorMessage: 'Invalid route. Please select a valid "from" and "to" combination.' });
    }

    const vehicleDetails = vehicle_placement_no ? await getVehicleDetails(vehicle_placement_no) : {};

    const updatedFields = {
      jobOrder_no,
      vehicle_placement_no,
      vehicleNo: vehicleDetails.vehicleNo || vehicleNo,
      broker: vehicleDetails.broker || broker,
      loadType: vehicleDetails.loadType || loadType,
      paymentto: vehicleDetails.paymentto || paymentto,
      indentNo,
      from,
      to,
      consignee,
      consignor,
      customer: indent.customer,
      customerGSTIN: indent.customerGSTIN,
      customerAddress: indent.customerAddress,
      orderNo: indent.orderNo,
      orderDate: indent.orderDate,
      orderMode: indent.orderMode,
      serviceMode: indent.serviceMode,
      expectedDate: indent.expectedDate,
      employee: indent.employee,
      dimensions: matchedItem.DIMENSIONS,
      weight: matchedItem.WEIGHT,
      quantumrate: matchedItem.QUANTUMRATE,
      effectiverate: matchedItem.EFFECTIVERATE,
      cost: matchedItem.COST,
      consignorGSTIN: consignorData?.gst?.GSTIN,
      consignorAddress: consignorData?.contact?.Address,
      consigneeGSTIN: consigneeData?.gst?.GSTIN,
      consigneeAddress: consigneeData?.contact?.Address,
    };

    // Find the job order by ID and update it
    const updatedJobOrder = await JobOrder.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedJobOrder) {
      return res.status(404).json({ errorMessage: 'Job Order not found' });
    }

    res.status(200).json(updatedJobOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};


const getVehicleDetails = async (vehicle_placement_no) => {
  const vehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no });
  if (vehiclePlacement) {
    return {
      vehicleNo: vehiclePlacement.vehicleNo,
      broker: vehiclePlacement.broker,
      loadType: vehiclePlacement.loadType,
      paymentto: vehiclePlacement.paymentto 
    };
  }
  throw new Error('VehiclePlacement not found');
};

// const updateJobOrderById = async (req, res) => {
//   const { id } = req.params;
//   const { jobOrder_no,vehicle_placement_no, indentNo, from, to, consignee, consignor } = req.body;

//   try {
//     // Simple validation
//     if (!jobOrder_no || !indentNo || !from || !to || !consignee || !consignor) {
//       return res.status(400).json({ errorMessage: 'Please provide all required fields' });
//     }

//     // Check if the indent exists using indentNo
//     const indent = await Indent.findOne({ indentNo });

//     if (!indent) {
//       return res.status(404).json({ errorMessage: 'Indent not found' });
//     }

//     // Validate that the provided 'from' and 'to' match one of the routes in the indent
//     const isValidRoute = indent.additem.some(item => item.from === from && item.to === to);
//     if (!isValidRoute) {
//       return res.status(400).json({ errorMessage: 'Invalid route. Please select a valid "from" and "to" combination.' });
//     }

//     // Find the job order by ID and update it
//     const updatedJobOrder = await JobOrder.findByIdAndUpdate(id, { jobOrder_no,vehicle_placement_no, indentNo, from, to, consignee, consignor }, { new: true });

//     if (!updatedJobOrder) {
//       return res.status(404).json({ errorMessage: 'Job Order not found' });
//     }

//     res.status(200).json(updatedJobOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ errorMessage: 'Server Error' });
//   }
// };



const updateJobOrderByJobOrderNo = async (req, res) => {
  const { jobOrder_no } = req.params;
  const { indentNo, from, to, consignee, consignor } = req.body;

  try {
    // Simple validation
    if (!indentNo || !from || !to || !consignee || !consignor) {
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

    // Find the job order by jobOrder_no and update it
    const updatedJobOrder = await JobOrder.findOneAndUpdate(
      { jobOrder_no },
      { jobOrder_no, indentNo, from, to, consignee, consignor },
      { new: true }
    );

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


module.exports = { createJobOrder, getJobOrderByNumber,getAllJobOrders, updateJobOrderById, getJobOrderById, updateJobOrderByJobOrderNo };

