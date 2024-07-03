// controllers/branchController.js
const Branch = require('../models/Branch');

const createBranch = async (req, res) => {
  const { BranchName } = req.body;

  try {
    // Simple validation
    if (!BranchName) {
      return res.status(400).json({ errorMessage: 'Please provide a branch name' });
    }

    // Create a new branch
    const newBranch = new Branch({ BranchName });
    const savedBranch = await newBranch.save();

    res.status(201).json(savedBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};


const getAllBranches = async (req, res) => {
    try {
      // Retrieve all branches
      const branches = await Branch.find();
      
      res.json(branches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errorMessage: 'Server Error' });
    }
  };

  const getBranchByName = async (req, res) => {
    const { branchName } = req.params;
  
    try {
      // Retrieve the branch by name
      const branch = await Branch.findOne({ BranchName: branchName });
  
      if (!branch) {
        return res.status(404).json({ errorMessage: 'Branch not found' });
      }
  
      res.json(branch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
  

module.exports = { createBranch, getAllBranches, getBranchByName };
