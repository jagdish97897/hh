const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

// Route to add a new branch
router.post('/addbranch', branchController.createBranch);
router.get('/getAllBranches', branchController.getAllBranches);
router.get('/branches/:branchName', branchController.getBranchByName);
module.exports = router;



// const express = require('express');
// const router = express.Router();
// const branchController = require('../controllers/branchController');

// // @route   POST /register
// // @desc    Register user
// // @access  Public
// router.post('/addbranch', branchController.createBranch);

// module.exports = router;
