// routes/indentRoutes.js

const express = require('express');
const router = express.Router();
const { createIndent, updateIndent, getAllIndents,getIndentById, getIndentByIndentNo } = require('../controllers/indentController');

router.post('/indents', createIndent);
router.get('/getallindents', getAllIndents);
router.put('/update/:id', updateIndent);
router.get('/getindent/:id', getIndentById);
router.get('/getsingleindentdetails/:indentNo', getIndentByIndentNo);

module.exports = router;
