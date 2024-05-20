const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Indent = require('./Indent'); // Ensure the path to your Indent model is correct

// Item Schema
const itemSchema = new Schema({
  pkgstype: {
    type: String,
    enum: [
      'BAG', 'BOOK', 'BUNDLE', 'C BOX', 'LOOSE',
      'MT', 'NOS', 'W BOX' 
    ],
    required: true
  },
  INVOICE_NO: { type: Number },
  INVOICE_DATE: { type: Date, default: Date.now, required: true },
  CONTENT:{type: String},
  WEIGHT_TYPE: {
    type: String,
    enum: ['ACTUAL', 'TARE', 'VOLUMETRIC'],
    required: true
  },
  VOL_UNIT: {
    type: String,
    enum: ['CMS', 'FEET', 'INCH'],
    required: true
  },
  PKGS: { type: Number },
  WEIGHT: { type: Number },
  TARE: { type: Number },
  CONTAINER: { type: Number },
  NO_OF_VEHICLE: { type: Number },
  REMARKS: { type: String }
});

// Total Schema
const totalSchema = new Schema({
  pkgs: { type: Number },
  weight: { type: Number },
  tare: { type: Number },
  contailer: { type: Number },
  noOfVehicle: { type: Number },
  status: {
    type: String,
    enum: ['Open', 'Close'],
    default: 'Open'
  },
  approvedComment: { type: String },
  remark: { type: String }
});


// Define schema for the job order
const jobOrderSchema = new Schema({
  jobOrder_no: { type: String, required: true },
  indentNo: { type: String, required: true }, // Use indentNo for reference
  // Fields to be auto-filled from Indent
  customer: { type: String },
  orderNo: { type: String },
  orderDate: { type: Date },
  orderMode: { type: String },
  serviceMode: { type: String },
  rfq: { type: Number },
  orderType: { type: String },
  expectedDate: { type: Date },
  employee: { type: String },
  source: { type: String },
  destination: { type: String },
  consignor: { type: String },
  consignee: { type: String },
  additem: [itemSchema], // Array of items
  total: totalSchema 
});

// Middleware to auto-fill fields from Indent
jobOrderSchema.pre('save', async function (next) {
  if (this.isNew) { // Only run this middleware when the document is new
    try {
      // Find the indent using indentNo
      const indent = await Indent.findOne({ indentNo: this.indentNo });

      if (!indent) {
        return next(new Error('Indent not found'));
      }

      // Auto-fill fields from Indent
      this.customer = indent.customer;
      this.orderNo = indent.orderNo;
      this.orderDate = indent.orderDate;
      this.orderMode = indent.orderMode;
      this.serviceMode = indent.serviceMode;
      this.rfq = indent.rfq;
      this.orderType = indent.orderType;
      this.expectedDate = indent.expectedDate;
      this.employee = indent.employee;
      this.source = indent.source;
      this.destination = indent.destination;
      this.consignor = indent.other.consignor; // Add consignor
      this.consignee = indent.other.consignee; // Add consignee

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


// Middleware to calculate total values
jobOrderSchema.pre('save', function (next) {
  const total = this.additem.reduce((acc, curr) => {
    acc.pkgs += curr.PKGS || 0;
    acc.weight += curr.WEIGHT || 0;
    acc.tare += curr.TARE || 0;
    acc.container += curr.CONTAINER || 0;
    acc.noOfVehicle += curr.NO_OF_VEHICLE || 0;
    return acc;
  }, { pkgs: 0, weight: 0, tare: 0, container: 0,  noOfVehicle: 0 });

  this.total = {
    ...total,
    status: 'Open', 
    approvedComment: '',
    remark: ''
  };
  next();
});

module.exports = mongoose.model('JobOrder', jobOrderSchema);




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Indent = require('./Indent'); // Ensure the path to your Indent model is correct

// // Define schema for the job order
// const jobOrderSchema = new Schema({
//   jobOrder_no: { type: String, required: true },
//   indentNo: { type: String, required: true }, // Use indentNo for reference
//   // Fields to be auto-filled from Indent
//   customer: { type: String },
//   orderNo: { type: String },
//   orderDate: { type: Date },
//   orderMode: { type: String },
//   serviceMode: { type: String },
//   rfq: { type: Number },
//   orderType: { type: String },
//   expectedDate: { type: Date },
//   employee: { type: String },
//   source: { type: String },
//   destination: { type: String },
//   consignor: { type: String },
//   consignee: { type: String }
// });

// // Middleware to auto-fill fields from Indent
// jobOrderSchema.pre('save', async function (next) {
//   if (this.isNew) { // Only run this middleware when the document is new
//     try {
//       // Find the indent using indentNo
//       const indent = await Indent.findOne({ indentNo: this.indentNo });

//       if (!indent) {
//         return next(new Error('Indent not found'));
//       }

//       // Auto-fill fields from Indent
//       this.customer = indent.customer;
//       this.orderNo = indent.orderNo;
//       this.orderDate = indent.orderDate;
//       this.orderMode = indent.orderMode;
//       this.serviceMode = indent.serviceMode;
//       this.rfq = indent.rfq;
//       this.orderType = indent.orderType;
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
//       this.source = indent.source;
//       this.destination = indent.destination;
//       this.consignor = indent.other.consignor; // Add consignor
//       this.consignee = indent.other.consignee; // Add consignee

//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

// module.exports = mongoose.model('JobOrder', jobOrderSchema);




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Indent = require('./Indent'); // Ensure the path to your Indent model is correct

// // Define schema for the job order
// const jobOrderSchema = new Schema({
//   jobOrder_no: { type: String, required: true },
//   indentNo: { type: String, required: true }, // Use indentNo for reference
//   // Fields to be auto-filled from Indent
//   customer: { type: String },
//   orderNo: { type: String },
//   orderDate: { type: Date },
//   orderMode: { type: String },
//   serviceMode: { type: String },
//   rfq: { type: Number },
//   orderType: { type: String },
//   expectedDate: { type: Date },
//   employee: { type: String },
//   source: { type: String },
//   destination: { type: String }
// });

// // Middleware to auto-fill fields from Indent
// jobOrderSchema.pre('save', async function (next) {
//   if (this.isNew) { // Only run this middleware when the document is new
//     try {
//       // Find the indent using indentNo
//       const indent = await Indent.findOne({ indentNo: this.indentNo });

//       if (!indent) {
//         return next(new Error('Indent not found'));
//       }

//       // Auto-fill fields from Indent
//       this.customer = indent.customer;
//       this.orderNo = indent.orderNo;
//       this.orderDate = indent.orderDate;
//       this.orderMode = indent.orderMode;
//       this.serviceMode = indent.serviceMode;
//       this.rfq = indent.rfq;
//       this.orderType = indent.orderType;
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
//       this.source = indent.source;
//       this.destination = indent.destination;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

// module.exports = mongoose.model('JobOrder', jobOrderSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Indent = require('./Indent'); // Make sure the path to your Indent model is correct

// // Define schema for the job order
// const jobOrderSchema = new Schema({
//   jobOrder_no: { type: String, required: true },
//   indent_no: { type: Schema.Types.ObjectId, ref: 'Indent', required: true },
//   // Fields to be auto-filled from Indent
//   indentNo: { type: String },
//   customer: { type: String },
//   orderNo: { type: String },
//   orderDate: { type: Date },
//   orderMode: { type: String },
//   serviceMode: { type: String },
//   rfq: { type: Number },
//   orderType: { type: String },
//   expectedDate: { type: Date },
//   employee: { type: String },
//   source: { type: String },
//   destination: { type: String }
// });

// // Middleware to auto-fill fields from Indent
// jobOrderSchema.pre('save', async function (next) {
//   if (this.isNew) { // Only run this middleware when the document is new
//     try {
//       const indent = await Indent.findById(this.indent_no);

//       if (!indent) {
//         return next(new Error('Indent not found'));
//       }

//       // Auto-fill fields from Indent
//       this.indentNo = indent.indentNo;
//       this.customer = indent.customer;
//       this.orderNo = indent.orderNo;
//       this.orderDate = indent.orderDate;
//       this.orderMode = indent.orderMode;
//       this.serviceMode = indent.serviceMode;
//       this.rfq = indent.rfq;
//       this.orderType = indent.orderType;
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
//       this.source = indent.source;
//       this.destination = indent.destination;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

// module.exports = mongoose.model('JobOrder', jobOrderSchema);



// const mongoose = require('mongoose');

// // Define schema for the job order
// const jobOrderSchema = new mongoose.Schema({
//     jobOrder_no:String,
//     indent_no: String,
//     location: String,
//     assigned_branch: String,
//     order_details: {
//         order_mode: String,
//         order_type: String,
//         order_no: String,
//         expected_date: Date
//     },
//     load_details: {
//         load_type: String,
//         source_mode: String
//     },
//     consignor: {
//         name: String,
//         location: String,
//         gstin: String
//     },
//     consignee: {
//         name: String,
//         location: String,
//         gstin: String
//     },
//     customer: {
//         name: String,
//         location: String,
//         gstin: String
//     },
//     logistics_details: {
//         forwarder: String,
//         port: String,
//         source: String,
//         destination: String,
//         via: String
//     },
//     date: Date,
//     marketing_person: String
// });


// module.exports = mongoose.model('JobOrder', jobOrderSchema);
