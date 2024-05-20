// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BranchSchema = new Schema({
  BranchName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Branch', BranchSchema);
