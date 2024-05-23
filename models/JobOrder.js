const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Indent = require('./Indent'); // Ensure the path to your Indent model is correct


const jobOrderSchema = new Schema({
  jobOrder_no: { type: String, required: true },
  indentNo: { type: String, required: true }, // Use indentNo for reference
  // Fields to be auto-filled from Indent
  customer: { type: String },
  orderNo: { type: String },
  orderDate: { type: Date },
  orderMode: { type: String },
  serviceMode: { type: String },
  expectedDate: { type: Date },
  employee: { type: String },
  from: { type: String, required: true },
  to: { type: String, required: true },
  consignor: { type: String },
  consignee: { type: String },

  // Additional fields to be auto-filled from the matching item in Indent
  weight: { type: Number },
  quantumrate: { type: Number },
  effectiverate: { type: Number },
  cost: { type: Number }
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
      this.expectedDate = indent.expectedDate;
      this.employee = indent.employee;
      this.consignor = indent.other.consignor;
      this.consignee = indent.other.consignee;

      // Validate 'to' field based on 'from' field
      const validDestinations = await Indent.getValidDestinations(this.from);
      if (!validDestinations.includes(this.to)) {
        return next(new Error(`Invalid destination. Valid destinations for ${this.from} are: ${validDestinations.join(', ')}`));
      }

      // Find the matching item in the indent based on 'from' and 'to'
      const matchedItem = indent.additem.find(item => item.from === this.from && item.to === this.to);

      if (!matchedItem) {
        return next(new Error('Invalid route. Please select a valid "from" and "to" combination.'));
      }

      // Auto-fill the additional fields from the matching item
      this.weight = matchedItem.WEIGHT;
      this.quantumrate = matchedItem.QUANTUMRATE;
      this.effectiverate = matchedItem.EFFECTIVERATE;
      this.cost = matchedItem.COST;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Middleware to update indent totals after job order is created
jobOrderSchema.post('save', async function (doc, next) {
  try {
    // Find the indent
    const indent = await Indent.findOne({ indentNo: doc.indentNo });

    if (!indent) {
      return next(new Error('Indent not found'));
    }

    // Find the matching item in the indent based on 'from' and 'to'
    const matchedItem = indent.additem.find(item => item.from === doc.from && item.to === doc.to);

    if (!matchedItem) {
      return next(new Error('Invalid route. Please select a valid "from" and "to" combination.'));
    }

    // Subtract the job order values from the indent total
    indent.total.weight -= doc.weight;
    indent.total.quantumrate -= doc.quantumrate;
    indent.total.effectiverate -= doc.effectiverate;
    indent.total.cost -= doc.cost;

    // Update the indent status if all values are zero
    if ( indent.total.weight <= 0 && indent.total.quantumrate <= 0 && indent.total.cost <= 0 && indent.total.effectiverate <= 0) {
      indent.total.status = 'Close';
    }

    await indent.save();
    next();
  } catch (error) {
    next(error);
  }
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
//   expectedDate: { type: Date },
//   employee: { type: String },
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   consignor: { type: String },
//   consignee: { type: String },

//   // Additional fields to be auto-filled from the matching item in Indent
//   weight: { type: Number },
//   quantumrate: { type: Number },
//   effectiverate: { type: Number },
//   cost: { type: Number }
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
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
//       this.consignor = indent.other.consignor;
//       this.consignee = indent.other.consignee;


      
//       // Validate 'to' field based on 'from' field
//       const validDestinations = await Indent.getValidDestinations(this.from);
//       if (!validDestinations.includes(this.to)) {
//         return next(new Error(`Invalid destination. Valid destinations for ${this.from} are: ${validDestinations.join(', ')}`));
//       }

//       // Find the matching item in the indent based on 'from' and 'to'
//       const matchedItem = indent.additem.find(item => item.from === this.from && item.to === this.to);

//       if (!matchedItem) {
//         return next(new Error('Invalid route. Please select a valid "from" and "to" combination.'));
//       }

//       // Auto-fill the additional fields from the matching item
//       this.weight = matchedItem.WEIGHT;
//       this.quantumrate = matchedItem.QUANTUMRATE;
//       this.effectiverate = matchedItem.EFFECTIVERATE;
//       this.cost = matchedItem.COST;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

// // Middleware to update indent totals after job order is created
// jobOrderSchema.post('save', async function (doc, next) {
//   try {
//     // Find the indent
//     const indent = await Indent.findOne({ indentNo: doc.indentNo });

//     if (!indent) {
//       return next(new Error('Indent not found'));
//     }

//     // Find the matching item in the indent based on 'from' and 'to'
//     const matchedItem = indent.additem.find(item => item.from === doc.from && item.to === doc.to);

//     if (!matchedItem) {
//       return next(new Error('Invalid route. Please select a valid "from" and "to" combination.'));
//     }

//     // Subtract the job order values from the indent total
//     indent.total.weight -= doc.weight;
//     indent.total.quantumrate -= doc.quantumrate;
//     indent.total.effectiverate -= doc.effectiverate;
//     indent.total.cost -= doc.cost;

//     // Update the indent status if all values are zero
//     if ( indent.total.weight <= 0 && indent.total.quantumrate <= 0 && indent.total.cost <= 0 && indent.total.effectiverate <= 0) {
//       indent.total.status = 'Close';
//     }

//     await indent.save();
//     next();
//   } catch (error) {
//     next(error);
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
//   expectedDate: { type: Date },
//   employee: { type: String },
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   consignor: { type: String },
//   consignee: { type: String },
//   // Additional fields to be auto-filled from the matching item in Indent
//   dimensions: { type: Number },
//   weight: { type: Number },
//   quantum: { type: Number },
//   rate: { type: Number },
//   effectiverate: { type: Number }
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
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
//       this.consignor = indent.other.consignor;
//       this.consignee = indent.other.consignee;

//       // Find the matching item in the indent based on 'from' and 'to'
//       const matchedItem = indent.additem.find(item => item.from === this.from && item.to === this.to);

//       if (!matchedItem) {
//         return next(new Error('Invalid route. Please select a valid "from" and "to" combination.'));
//       }

//       // Auto-fill the additional fields from the matching item
//       this.dimensions = matchedItem.DIMENSIONS;
//       this.weight = matchedItem.WEIGHT;
//       this.quantum = matchedItem.QUANTUM;
//       this.rate = matchedItem.RATE;
//       this.effectiverate = matchedItem.EFFECTIVERATE;

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
//   expectedDate: { type: Date },
//   employee: { type: String },
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   consignor: { type: String },
//   consignee: { type: String },
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
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
//       this.consignor = indent.other.consignor;
//       this.consignee = indent.other.consignee;

//       // Validate that the provided 'from' and 'to' match one of the routes in the indent
//       const isValidRoute = indent.additem.some(item => item.from === this.from && item.to === this.to);

//       if (!isValidRoute) {
//         return next(new Error('Invalid route. Please select a valid "from" and "to" combination.'));
//       }

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
//   expectedDate: { type: Date },
//   employee: { type: String },
//   from: { type: String },
//   to: { type: String },
//   consignor: { type: String },
//   consignee: { type: String },
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
//       this.expectedDate = indent.expectedDate;
//       this.employee = indent.employee;
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
//   expectedDate: { type: Date },
//   employee: { type: String },
//   source: { type: String },
//   destination: { type: String },
//   consignor: { type: String },
//   consignee: { type: String },


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
