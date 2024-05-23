const JobOrder = require('../models/JobOrder');
const Indent = require('../models/Indent');

const createJobOrder = async (req, res) => {
  const { jobOrder_no, indentNo, from, to } = req.body;

  try {
    // Simple validation
    if (!jobOrder_no || !indentNo || !from || !to) {
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
    const newJobOrder = new JobOrder({ jobOrder_no, indentNo, from, to });
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


module.exports = { createJobOrder, getJobOrderByNumber };


// // controllers/jobOrderController.js

// const JobOrder = require('../models/JobOrder');
// const Indent = require('../models/Indent');

// const createJobOrder = async (req, res) => {
//   const { jobOrder_no, indentNo } = req.body;

//   try {
//     // Simple validation
//     if (!jobOrder_no || !indentNo) {
//       return res.status(400).json({ errorMessage: 'Please provide all required fields' });
//     }

//     // Check if the indent exists using indentNo
//     const indent = await Indent.findOne({ indentNo });

//     if (!indent) {
//       return res.status(404).json({ errorMessage: 'Indent not found' });
//     }

//     // Create a new job order
//     const newJobOrder = new JobOrder({ jobOrder_no, indentNo });
//     const savedJobOrder = await newJobOrder.save();

//     res.status(201).json(savedJobOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ errorMessage: 'Server Error' });
//   }
// };

// module.exports = { createJobOrder };



// // controllers/jobOrderController.js

// const JobOrder = require('../models/JobOrder');
// const Indent = require('../models/Indent');

// const createJobOrder = async (req, res) => {
//   const { jobOrder_no, indentNo } = req.body;

//   try {
//     // Simple validation
//     if (!jobOrder_no || !indentNo) {
//       return res.status(400).json({ errorMessage: 'Please provide all required fields' });
//     }

//     // Check if the indent exists using indentNo
//     const indent = await Indent.findOne({ indentNo });

//     if (!indent) {
//       return res.status(404).json({ errorMessage: 'Indent not found' });
//     }

//     // Create a new job order
//     const newJobOrder = new JobOrder({ jobOrder_no, indentNo });
//     const savedJobOrder = await newJobOrder.save();

//     res.status(201).json(savedJobOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ errorMessage: 'Server Error' });
//   }
// };

// module.exports = { createJobOrder };



// const JobOrder = require('../models/JobOrder');

// const createJobOrder = async (req, res) => {
//   try {
//     const { jobOrder_no, indent_no } = req.body;

//     // Check if indent exists
//     const indent = await Indent.findById(indent_no);
//     if (!indent) {
//       return res.status(404).json({ error: 'Indent not found' });
//     }

//     // Create job order
//     const jobOrder = new JobOrder({
//       jobOrder_no,
//       indent_no
//     });

//     await jobOrder.save();

//     res.status(201).json(jobOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = { createJobOrder };


// // controllers/jobOrderController.js
// const JobOrder = require('../models/JobOrder');
// const Indent = require('../models/Indent');

// // Create a new Job Order
// exports.createJobOrder = async (req, res) => {
//   try {
//     const { jobOrder_no, indent_no } = req.body;

//     // Check if indent exists
//     const indent = await Indent.findById(indent_no);
//     if (!indent) {
//       return res.status(404).json({ error: 'Indent not found' });
//     }

//     // Create job order
//     const jobOrder = new JobOrder({
//       jobOrder_no,
//       indent_no
//     });

//     await jobOrder.save();

//     res.status(201).json(jobOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all Job Orders
// exports.getAllJobOrders = async (req, res) => {
//   try {
//     const jobOrders = await JobOrder.find().populate('indent_no');
//     res.status(200).json(jobOrders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get Job Order by ID
// exports.getJobOrderById = async (req, res) => {
//   try {
//     const jobOrder = await JobOrder.findById(req.params.id).populate('indent_no');
//     if (!jobOrder) {
//       return res.status(404).json({ error: 'Job Order not found' });
//     }
//     res.status(200).json(jobOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update Job Order
// exports.updateJobOrder = async (req, res) => {
//   try {
//     const { jobOrder_no, indent_no } = req.body;
//     const jobOrder = await JobOrder.findById(req.params.id);
//     if (!jobOrder) {
//       return res.status(404).json({ error: 'Job Order not found' });
//     }

//     jobOrder.jobOrder_no = jobOrder_no || jobOrder.jobOrder_no;
//     jobOrder.indent_no = indent_no || jobOrder.indent_no;

//     await jobOrder.save();

//     res.status(200).json(jobOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete Job Order
// exports.deleteJobOrder = async (req, res) => {
//   try {
//     const jobOrder = await JobOrder.findById(req.params.id);
//     if (!jobOrder) {
//       return res.status(404).json({ error: 'Job Order not found' });
//     }

//     await jobOrder.remove();
//     res.status(200).json({ message: 'Job Order deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
