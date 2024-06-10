const mongoose = require('mongoose');
const { Schema } = mongoose;
const Parties = require('./Parties');

const itemSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: [{
    destination: {
      type: String,
      required: true
    },
    distance: {
      type: String,
      required: true
    }
  }],
  vehicletype: {
    type: String,
    enum: ['TRUCK', 'TROLLEY', 'CONTAINER', 'TANKER', 'OTHER'],
    required: true
  },
  DIMENSIONS: { type: String },
  WEIGHT: { type: Number },
  QUANTUMRATE: { type: Number },
  EFFECTIVERATE: { type: Number },
  COST: { type: Number },
  REMARKS: { type: String }
});

// Total Schema
const totalSchema = new Schema({
  weight: { type: Number },
  quantumrate: { type: Number },
  cost: { type: Number },
  effectiverate: { type: Number },
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
  indentNo: { type: String, required: true, unique: false },
  date: { type: Date, default: Date.now, required: true },
  customer: { type: String, required: true },
  customerGSTIN: { type: String }, // New field to store customer GSTIN
  customerAddress: { type: String }, // New field to store customer Address
  orderNo: { type: String, required: true },
  orderDate: { type: Date, required: true },
  orderMode: { type: String, required: true },
  serviceMode: { type: String, required: true },
  rfq: { type: String, required: true },
  expectedDate: { type: Date, required: true },
  employee: { type: String, required: true },
  other: {
    consignor: { type: String },
    consignee: { type: String },
    remark: { type: String }
  },
  additem: [itemSchema], // Array of items
  total: totalSchema // Embedded total schema
});

// Middleware to verify customer, consignor and consignee exist in the Parties collection and fetch customer details
indentSchema.pre('save', async function (next) {
  try {
    const customer1 = await Parties.findOne({ name: this.customer, type: 'Customer1' });
    if (!customer1) {
      return next(new Error('Customer1 not found in collection'));
    }

    // Set the customer's GSTIN and address
    this.customerGSTIN = customer1.gst.GSTIN;
    this.customerAddress = customer1.contact.Address;

    if (this.other.consignor) {
      const consignor = await Parties.findOne({ name: this.other.consignor, type: 'Customer2' });
      if (!consignor) {
        return next(new Error('Consignor not found in collection'));
      }
    }

    if (this.other.consignee) {
      const consignee = await Parties.findOne({ name: this.other.consignee, type: 'Customer2' });
      if (!consignee) {
        return next(new Error('Consignee not found in collection'));
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to calculate total values
indentSchema.pre('save', function (next) {
  const total = this.additem.reduce((acc, curr) => {
    acc.weight += curr.WEIGHT || 0;
    acc.quantumrate += curr.QUANTUMRATE || 0;
    acc.effectiverate += curr.EFFECTIVERATE || 0;
    acc.cost += curr.COST || 0;
    return acc;
  }, { weight: 0, quantumrate: 0, effectiverate: 0, cost: 0 });

  this.total = {
    ...total,
    status: 'Open',
    approvedComment: '',
    remark: ''
  };
  next();
});

// Static method to get valid destinations for a given 'from' location
indentSchema.statics.getValidDestinations = async function (from) {
  const indents = await this.find({ "additem.from": from });
  const destinations = new Set();
  indents.forEach(indent => {
    indent.additem.forEach(item => {
      if (item.from === from) {
        destinations.add(item.to);
      }
    });
  });
  return Array.from(destinations);
};

module.exports = mongoose.model('Indent', indentSchema);




// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const Parties = require('./Parties');

// const itemSchema = new Schema({
//   from: { type: String },
//   to: { type: String },
//   vehicletype: {
//     type: String,
//     enum: ['TRUCK', 'TROLLEY', 'CONTAINER', 'TANKER', 'OTHER'],
//     required: true
//   },
//   DIMENSIONS: {
//     type: String,
//     default: function() {
//       if (this.vehicletype === 'TRUCK') {
//         return '19x7x7';
//       } else {
//         return ''; // Set default dimensions for other vehicle types
//       }
//     }
//   },
//   WEIGHT: { type: Number },
//   QUANTUMRATE: { type: Number },
//   EFFECTIVERATE: { type: Number },
//   COST: { type: Number },
//   REMARKS: { type: String }
// });

// // Pre-save middleware to set QUANTUMRATE and EFFECTIVERATE based on DIMENSIONS
// itemSchema.pre('save', function(next) {
//   const dimensions = this.DIMENSIONS.split('x').map(Number); // Convert DIMENSIONS string to an array of numbers

//   // Calculate the new volume
//   const newVolume = dimensions.reduce((acc, val) => acc * (val + 1), 1);

//   // Set QUANTUMRATE based on the original dimensions
//   if (this.vehicletype === 'TRUCK') {
//     this.QUANTUMRATE = 10000;
//   } else {
//     // Define other logic for different vehicle types if needed
//     this.QUANTUMRATE = 0; // Set a default rate if no specific rate is defined
//   }

//   // Calculate EFFECTIVERATE based on the new volume
//   this.EFFECTIVERATE = this.QUANTUMRATE * (newVolume / 931); // Assuming original volume is 931

//   next();
// });

// // Define pre-save hook to automatically calculate cost
// itemSchema.pre('save', function(next) {
//   if (this.WEIGHT !== undefined && this.QUANTUMRATE !== undefined) {
//     if (this.EFFECTIVERATE !== 0) {
//       this.COST = this.EFFECTIVERATE * this.WEIGHT;
//     } else if (this.QUANTUMRATE !== 0) {
//       this.COST = this.QUANTUMRATE * this.WEIGHT;
//     } else {
//       // If neither QUANTUMRATE nor EFFECTIVERATE is provided, set cost to 0
//       this.COST = 0;
//     }
//   }
//   next();
// });

// // Total Schema
// const totalSchema = new Schema({
//   weight: { type: Number },
//   quantumrate: { type: Number },
//   cost: { type: Number },
//   effectiverate: { type: Number },
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
//   indentNo: { type: String, required: true, unique: false },
//   date: { type: Date, default: Date.now, required: true },
//   customer: { type: String, required: true },
//   customerGSTIN: { type: String }, // New field to store customer GSTIN
//   customerAddress: { type: String }, // New field to store customer Address
//   orderNo: { type: String, required: true },
//   orderDate: { type: Date, required: true },
//   orderMode: { type: String, required: true },
//   serviceMode: { type: String, required: true },
//   rfq: { type: String, required: true },
//   expectedDate: { type: Date, required: true },
//   employee: { type: String, required: true },
//   other: {
//     consignor: { type: String },
//     consignee: { type: String },
//     remark: { type: String }
//   },
//   additem: [itemSchema], // Array of items
//   total: totalSchema // Embedded total schema
// });

// // Middleware to verify customer, consignor and consignee exist in the Parties collection and fetch customer details
// indentSchema.pre('save', async function (next) {
//   try {
//     const customer1 = await Parties.findOne({ name: this.customer, type: 'Customer1' });
//     if (!customer1) {
//       return next(new Error('Customer1 not found in collection'));
//     }

//     // Set the customer's GSTIN and address
//     this.customerGSTIN = customer1.gst.GSTIN;
//     this.customerAddress = customer1.contact.Address;

//     if (this.other.consignor) {
//       const consignor = await Parties.findOne({ name: this.other.consignor, type: 'Customer2' });
//       if (!consignor) {
//         return next(new Error('Consignor not found in collection'));
//       }
//     }

//     if (this.other.consignee) {
//       const consignee = await Parties.findOne({ name: this.other.consignee, type: 'Customer2' });
//       if (!consignee) {
//         return next(new Error('Consignee not found in collection'));
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Middleware to calculate total values
// indentSchema.pre('save', function (next) {
//   const total = this.additem.reduce((acc, curr) => {
//     acc.weight += curr.WEIGHT || 0;
//     acc.quantumrate += curr.QUANTUMRATE || 0;
//     acc.effectiverate += curr.EFFECTIVERATE || 0;
//     acc.cost += curr.COST || 0;
//     return acc;
//   }, { weight: 0, quantumrate: 0, effectiverate: 0, cost: 0 });

//   this.total = {
//     ...total,
//     status: 'Open',
//     approvedComment: '',
//     remark: ''
//   };
//   next();
// });

// // Static method to get valid destinations for a given 'from' location
// indentSchema.statics.getValidDestinations = async function(from) {
//   const indents = await this.find({ "additem.from": from });
//   const destinations = new Set();
//   indents.forEach(indent => {
//     indent.additem.forEach(item => {
//       if (item.from === from) {
//         destinations.add(item.to);
//       }
//     });
//   });
//   return Array.from(destinations);
// };

// module.exports = mongoose.model('Indent', indentSchema);




// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const Parties = require('./Parties');

// const itemSchema = new Schema({
//   from: { type: String },
//   to: { type: String },
//   vehicletype: {
//     type: String,
//     enum: ['TRUCK', 'TROLLEY', 'CONTAINER', 'TANKER', 'OTHER'],
//     required: true
//   },
//   DIMENSIONS: {
//     type: String,
//     default: function() {
//       if (this.vehicletype === 'TRUCK') {
//         return '19x7x7';
//       } else if (this.vehicletype === 'TROLLEY') {
//         return '20x7x7';
//       } else if (this.vehicletype === 'CONTAINER') {
//         return '20x8x8';
//       } else if (this.vehicletype === 'TANKER') {
//         return '10x5x5';
//       } else {
//         return ''; // Set default dimensions for other vehicle types
//       }
//     }
//   },
//   WEIGHT: { type: Number },
//   QUANTUMRATE: { type: Number },
//   EFFECTIVERATE: { type: Number },
//   COST: { type: Number },
//   REMARKS: { type: String }
// });

// // Pre-save middleware to set QUANTUMRATE based on DIMENSIONS
// itemSchema.pre('save', function(next) {
//   if (this.DIMENSIONS === '19x7x7') {
//     this.QUANTUMRATE = 10000;
//   } else {
//     // Define other logic for different dimensions if needed
//     this.EFFECTIVERATE = 0; // Default value if no specific rate is defined
//   }
//   next();
// });

// // Define pre-save hook to automatically calculate cost
// itemSchema.pre('save', function(next) {
//   if (this.WEIGHT !== undefined && this.QUANTUMRATE !== undefined) {
//     if (this.EFFECTIVERATE !== 0) {
//       this.COST = this.EFFECTIVERATE * this.WEIGHT;
//     } else if (this.QUANTUMRATE !== 0) {
//       this.COST = this.QUANTUMRATE * this.WEIGHT;
//     } else {
//       // If neither QUANTUMRATE nor EFFECTIVERATE is provided, set cost to 0
//       this.COST = 0;
//     }
//   }
//   next();
// });

// // Total Schema
// const totalSchema = new Schema({
//   weight: { type: Number },
//   quantumrate: { type: Number },
//   cost: { type: Number },
//   effectiverate: { type: Number },
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
//   indentNo: { type: String, required: true, unique: false },
//   date: { type: Date, default: Date.now, required: true },
//   customer: { type: String, required: true },
//   customerGSTIN: { type: String }, // New field to store customer GSTIN
//   customerAddress: { type: String }, // New field to store customer Address
//   orderNo: { type: String, required: true },
//   orderDate: { type: Date, required: true },
//   orderMode: { type: String, required: true },
//   serviceMode: { type: String, required: true },
//   rfq: { type: String, required: true },
//   expectedDate: { type: Date, required: true },
//   employee: { type: String, required: true },
//   other: {
//     consignor: { type: String },
//     consignee: { type: String },
//     remark: { type: String }
//   },
//   additem: [itemSchema], // Array of items
//   total: totalSchema // Embedded total schema
// });

// // Middleware to verify customer, consignor and consignee exist in the Parties collection and fetch customer details
// indentSchema.pre('save', async function (next) {
//   try {
//     const customer1 = await Parties.findOne({ name: this.customer, type: 'Customer1' });
//     if (!customer1) {
//       return next(new Error('Customer1 not found in collection'));
//     }

//     // Set the customer's GSTIN and address
//     this.customerGSTIN = customer1.gst.GSTIN;
//     this.customerAddress = customer1.contact.Address;

//     if (this.other.consignor) {
//       const consignor = await Parties.findOne({ name: this.other.consignor, type: 'Customer2' });
//       if (!consignor) {
//         return next(new Error('Consignor not found in collection'));
//       }
//     }

//     if (this.other.consignee) {
//       const consignee = await Parties.findOne({ name: this.other.consignee, type: 'Customer2' });
//       if (!consignee) {
//         return next(new Error('Consignee not found in collection'));
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Middleware to calculate total values
// indentSchema.pre('save', function (next) {
//   const total = this.additem.reduce((acc, curr) => {
//     acc.weight += curr.WEIGHT || 0;
//     acc.quantumrate += curr.QUANTUMRATE || 0;
//     acc.effectiverate += curr.EFFECTIVERATE || 0;
//     acc.cost += curr.COST || 0;
//     return acc;
//   }, { weight: 0, quantumrate: 0, effectiverate: 0, cost: 0 });

//   this.total = {
//     ...total,
//     status: 'Open',
//     approvedComment: '',
//     remark: ''
//   };
//   next();
// });

// // Static method to get valid destinations for a given 'from' location
// indentSchema.statics.getValidDestinations = async function(from) {
//   const indents = await this.find({ "additem.from": from });
//   const destinations = new Set();
//   indents.forEach(indent => {
//     indent.additem.forEach(item => {
//       if (item.from === from) {
//         destinations.add(item.to);
//       }
//     });
//   });
//   return Array.from(destinations);
// };

// module.exports = mongoose.model('Indent', indentSchema);



