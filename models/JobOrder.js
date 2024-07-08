
// module.exports = mongoose.model('JobOrder', jobOrderSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Indent = require('./Indent'); 
const Parties = require('./Parties'); 
const VehiclePlacement = require('./VehiclePlacement');

const jobOrderSchema = new Schema({
  jobOrder_no: { type: String, required: true, unique: true },
  vehicle_placement_no: { type: String },
  vehicleNo: { type: String },
  broker: { type: String },
  loadType: { type: String },
  paymentto: { type: String },


  consignor: { type: String },
  consignorGSTIN: { type: String }, // New field for consignor GSTIN
  consignorAddress: { type: String }, // New field for consignor address
  consignee: { type: String },
  consigneeGSTIN: { type: String }, // New field for consignee GSTIN
  consigneeAddress: { type: String }, // New field for consignee address
  PAN: { type: String }, 
  
  indentNo: { type: String, required: true }, // Use indentNo for reference
  // Fields to be auto-filled from Indent
  customer: { type: String },
  customerGSTIN: { type: String },
  customerAddress: { type: String },
  orderNo: { type: String },
  orderDate: { type: Date },
  orderMode: { type: String },
  serviceMode: { type: String },
  expectedDate: { type: Date },
  employee: { type: String },
  from: { type: String, required: true },
  to: { type: String, required: true },
  // Additional fields to be auto-filled from the matching item in Indent
  dimensions: { type: String },
  weight: { type: Number },
  quantumrate: { type: Number },
  effectiverate: { type: Number },
  cost: { type: Number }
});

// Middleware to auto-fill fields from Indent and validate consignor/consignee
jobOrderSchema.pre('save', async function (next) {
  if (this.isNew) { // Only run this middleware when the document is new
    try {
      // Check if a job order with the same indentNo, from, and to already exists
      const existingJobOrder = await mongoose.model('JobOrder').findOne({ indentNo: this.indentNo, from: this.from, to: this.to });
      if (existingJobOrder) {
        return next(new Error('Job order for this indent, from, and to already exists.'));
      }

      // Find the indent using indentNo
      const indent = await Indent.findOne({ indentNo: this.indentNo });

      if (!indent) {
        return next(new Error('Indent not found'));
      }

      // Prevent creation if the indent status is 'Close'
      if (indent.total.status === 'Close') {
        return next(new Error('Cannot create job order. The indent has been closed.'));
      }

      // Auto-fill fields from Indent
      this.customer = indent.customer;
      this.customerGSTIN = indent.customerGSTIN;
      this.customerAddress = indent.customerAddress;
      this.orderNo = indent.orderNo;
      this.orderDate = indent.orderDate;
      this.orderMode = indent.orderMode;
      this.serviceMode = indent.serviceMode;
      this.expectedDate = indent.expectedDate;
      this.employee = indent.employee;

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
      this.dimensions = matchedItem.DIMENSIONS;
      this.weight = matchedItem.WEIGHT;
      this.quantumrate = matchedItem.QUANTUMRATE;
      this.effectiverate = matchedItem.EFFECTIVERATE;
      this.cost = matchedItem.COST;

      // Validate and auto-fill consignor details from Customer2
      if (this.consignor) {
        const consignorData = await Parties.findOne({ name: this.consignor, type: 'Customer2' });
        if (!consignorData) {
          return next(new Error('Consignor not found in Customer2 data'));
        }
        this.consignorGSTIN = consignorData.gst.GSTIN; // Auto-fill consignor GSTIN
        this.consignorAddress = consignorData.contact.Address; // Auto-fill consignor address
      }

      // Validate and auto-fill consignee details from Customer2
      if (this.consignee) {
        const consigneeData = await Parties.findOne({ name: this.consignee, type: 'Customer2' });
        if (!consigneeData) {
          return next(new Error('Consignee not found in Customer2 data'));
        }
        this.consigneeGSTIN = consigneeData.gst.GSTIN; // Auto-fill consignee GSTIN
        this.consigneeAddress = consigneeData.contact.Address; // Auto-fill consignee address
        this.PAN = consigneeData.tds.PAN; // Auto-fill consignee address
      }

      if (this.vehicle_placement_no) {
        const vehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no: this.vehicle_placement_no });
        if (vehiclePlacement) {
          this.vehicleNo = vehiclePlacement.vehicleNo;
          this.broker = vehiclePlacement.broker;
          this.loadType = vehiclePlacement.loadType;
          this.paymentto = vehiclePlacement.paymentto;
        } else {
          return next(new Error('VehiclePlacement not found'));
        }
      }

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

    await indent.save();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('JobOrder', jobOrderSchema);

