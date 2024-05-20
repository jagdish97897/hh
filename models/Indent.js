const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Parties = require('./Parties');

// Item Schema
const itemSchema = new Schema({
  loadtype: {
    type: String,
    enum: [
      'FTCLOSE BODY', 'FT CONTAINER', 'FT DALA BODY', 'FT LPT', 'FT CONTAINER',
      'FT CONTAINER', 'FT CONTAINER MXL', 'FT CONTAINER SXL', 'FT TROLLA',
      'FT CONTAINER', 'PRIME MOVER', 'FT TRAILER XXXL', 'BY HAND PICKUP',
      'CANTER', 'CLOSE TRURAS', 'CLOSED BODY TRUCK', 'FTL', 'HIGH BED TRAILER',
      'JCB'
    ],
    required: true
  },
  PKGS: { type: Number },
  WEIGHT: { type: Number },
  RATE_CALCULATE_ON: {
    type: String,
    enum: ['FIXED', 'PKGS', 'WEIGHT'],
    required: true
  },
  RATE: { type: Number },
  FREIGHT: { type: Number },
  NO_OF_VEHICLE: { type: Number },
  ADVANCE: { type: Number },
  BALANCE: { type: Number },
  REMARKS: { type: String }
});

// Total Schema
const totalSchema = new Schema({
  pkgs: { type: Number },
  weight: { type: Number },
  freight: { type: Number },
  advance: { type: Number },
  balance: { type: Number },
  noOfVehicle: { type: Number },
  status: {
    type: String,
    enum: ['Open', 'Close'],
    default: 'Open'
  },
  approvedComment: { type: String },
  remark: { type: String }
});

// Indent Schema
const indentSchema = new Schema({
  indentNo: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  customer: { type: String, required: true },
  balance: { type: Number, default: 0 },
  orderNo: { type: String, required: true },
  orderDate: { type: Date, required: true },
  orderMode: { type: String, required: true },
  serviceMode: { type: String, required: true },
  rfq: { type: Number, required: true },
  orderType: { type: String, required: true },
  expectedDate: { type: Date, required: true },
  employee: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  other: {
    consignor: { type: String, required: true },
    consignee: { type: String, required: true },
    remark: { type: String }
  },
  additem: [itemSchema], // Array of items
  total: totalSchema // Embedded total schema
});

// Middleware to verify customer consignor and consignee exist in the Parties collection
indentSchema.pre('save', async function (next) {
  try {
    const customer1 = await Parties.findOne({ name: this.customer, type: 'Customer1' });
    if (!customer1) {
      return next(new Error('Customer1 not found in collection'));
    }

    const consignor = await Parties.findOne({ name: this.other.consignor, type: 'Customer2' });
    if (!consignor) {
      return next(new Error('Consignor not found in collection'));
    }

    const consignee = await Parties.findOne({ name: this.other.consignee, type: 'Customer2' });
    if (!consignee) {
      return next(new Error('Consignee not found in collection'));
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to calculate total values
indentSchema.pre('save', function (next) {
  const total = this.additem.reduce((acc, curr) => {
    acc.pkgs += curr.PKGS || 0;
    acc.weight += curr.WEIGHT || 0;
    acc.freight += curr.FREIGHT || 0;
    acc.advance += curr.ADVANCE || 0;
    acc.balance += curr.BALANCE || 0;
    acc.noOfVehicle += curr.NO_OF_VEHICLE || 0;
    return acc;
  }, { pkgs: 0, weight: 0, freight: 0, advance: 0, balance: 0, noOfVehicle: 0 });

  this.total = {
    ...total,
    status: 'Open', 
    approvedComment: '',
    remark: ''
  };
  next();
});

module.exports = mongoose.model('Indent', indentSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Parties = require('./Parties');

// // Item Schema
// const itemSchema = new Schema({
//   loadtype: {
//     type: String,
//     enum: [
//       'FTCLOSE BODY', 'FT CONTAINER', 'FT DALA BODY', 'FT LPT', 'FT CONTAINER', 
//       'FT CONTAINER', 'FT CONTAINER MXL', 'FT CONTAINER SXL', 'FT TROLLA', 
//       'FT CONTAINER', 'PRIME MOVER', 'FT TRAILER XXXL', 'BY HAND PICKUP', 
//       'CANTER', 'CLOSE TRURAS', 'CLOSED BODY TRUCK', 'FTL', 'HIGH BED TRAILER', 
//       'JCB'
//     ],
//     required: true
//   },
//   PKGS: { type: Number },
//   WEIGHT: { type: Number },
//   RATE_CALCULATE_ON: { 
//     type: String,
//     enum: ['FIXED', 'PKGS', 'WEIGHT'],
//     required: true
//   },
//   RATE: { type: Number },
//   FREIGHT: { type: Number },
//   NO_OF_VEHICLE: { type: Number },
//   ADVANCE: { type: Number },
//   BALANCE: { type: Number },
//   REMARKS: { type: String }
// });

// // Total Schema
// const totalSchema = new Schema({
//   pkgs: { type: Number },
//   weight: { type: Number },
//   fright: { type: Number },
//   advance: { type: Number },
//   balance: { type: Number },
//   noOfVehicle: { type: Number },
//   status: { 
//     type: String, 
//     enum: ['Open', 'Close'], 
//     default: 'Open' 
//   },
//   approvedComment: { type: String },
//   remark: { type: String }
// });

// // Indent Schema
// const indentSchema = new Schema({
//   indentNo: { type: String, required: true },
//   date: { type: Date, default: Date.now, required: true },
//   customer: { type: String, required: true },
//   balance: { type: Number, default: 0 },
//   orderNo: { type: String, required: true },
//   orderDate: { type: Date, required: true },
//   orderMode: { type: String, required: true },
//   serviceMode: { type: String, required: true },
//   rfq: { type: Number, required: true },
//   orderType: { type: String, required: true },
//   expectedDate: { type: Date, required: true },
//   employee: { type: String, required: true },
//   source: { type: String, required: true },
//   destination: { type: String, required: true },
//   additem: [itemSchema], // Array of items
//   total: totalSchema // Embedded total schema
// });

// // Middleware to verify owner and broker names exist in SupplyChainPartner collection
// indentSchema.pre('save', async function (next) {
//   const customer1 = await Parties.findOne({ name: this.customer, type: 'Customer1' });

//   if (!customer1) {
//     return next(new Error('Customer1 not found in collection'));
//   }

//   next();
// });

// indentSchema.pre('save', function(next) {
//   const total = this.additem.reduce((acc, curr) => {
//     acc.pkgs += curr.PKGS || 0;
//     acc.weight += curr.WEIGHT || 0;
//     acc.fright += curr.FREIGHT || 0;
//     acc.advance += curr.ADVANCE || 0;
//     acc.balance += curr.BALANCE || 0;
//     acc.noOfVehicle += curr.NO_OF_VEHICLE || 0;
//     return acc;
//   }, { pkgs: 0, weight: 0, fright: 0, advance: 0, balance: 0, noOfVehicle: 0 });

//   this.total = {
//     ...total,
//     status: 'Open', // Default to 'Open' or you can set it based on your logic
//     approvedComment: '',
//     remark: ''
//   };
//   next();
// });

// module.exports = mongoose.model('Indent', indentSchema);


