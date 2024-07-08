const mongoose = require('mongoose');
const JobOrder = require('./JobOrder');
const vehicleHireSchema = require('./VehicleHire');

const { Schema } = mongoose;

// Define schema for Charges
const chargesSchema = new Schema({
    sundry: {
        type: String,
        required: true,
        enum: ['STATISTICAL CHARGES', 'Loading Charge', 'OTHER CHARGES', 'LOADING DETENTION', 'ODC LENGTH']
    },
    taxable: { type: Boolean, required: true, default: false },
    calcOn: { type: String, enum: ['FIXED'], required: true },
    addDed: { type: String, enum: ['A', 'D'], required: true },
    rate: { type: Number, required: true, default: 0.00 },
    amount: { type: Number, required: true, default: 0.00 },
    gst: { type: Number, required: true, default: 0.00 },
    total: { type: Number, required: true, default: 0.00 },
    remarks: { type: String, required: false }
});

// Define schema for Goods Receipt
const goodsReceiptSchema = new mongoose.Schema({
    consignmentno: { type: String, required: true },
    vehiclehire_no: { type: String },


    jobOrder_no: { type: String, required: true },
    date: { type: Date, required: true },
    customer: { type: String },
    customerGSTIN: { type: String },
    customerAddress: { type: String },
    from: { type: String },
    to: { type: String },
    weight: { type: String },
    quantumrate: { type: String },
    dimensions: { type: String },
    effectiverate: { type: String },
    cost: { type: String },
    orderNo: { type: String },
    orderDate: { type: Date },
    orderMode: { type: String },
    serviceMode: { type: String },
    expectedDate: { type: Date },
    employee: { type: String },
    consignor: { type: String },
    consignorGSTIN: { type: String },
    consignorAddress: { type: String },
    consignee: { type: String },
    consigneeGSTIN: { type: String },
    consigneeAddress: { type: String },
    PAN: { type: String },
    vehicle_placement_no: { type: String },
    vehicleNo: { type: String },
    broker: { type: String },
    loadType: { type: String },
    paymentto: { type: String },
    charges: { type: [chargesSchema], required: false }, // Updated to an array of chargesSchema
    vehicleHireCharges: { type: [vehicleHireSchema.charges], required: false }, // Updated to an array of chargesSchema

    container: {
        linename: { type: String },
        date: { type: Date },
        loc: { type: String },
        cgw: { type: String },
        loadingno: { type: String },
        loadingdate: { type: Date },
        remarks: { type: String },
    },
    cod: {
        favouring: { type: String },
        amount: { type: Number, default: 0 },
        mode: {
            type: String,
            enum: ['CHEQUE', 'ATM', 'CASH', 'DD', 'ECS', 'NEFT', 'IMPS', 'RTGS'],
            default: 'CASH'
        },
        cancelReason: { type: String },
    }

});

// Middleware to auto-fill fields from JobOrder and calculate effective price
goodsReceiptSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const jobOrder = await JobOrder.findOne({ jobOrder_no: this.jobOrder_no });
            if (!jobOrder) {
                return next(new Error('JobOrder not found'));
            }
            // Auto-fill fields from JobOrder
            this.customer = jobOrder.customer;
            this.customerGSTIN = jobOrder.customerGSTIN;
            this.customerAddress = jobOrder.customerAddress;
            this.from = jobOrder.from;
            this.to = jobOrder.to;
            this.dimensions = jobOrder.dimensions;
            this.weight = jobOrder.weight;
            this.quantumrate = jobOrder.quantumrate;
            this.effectiverate = jobOrder.effectiverate;
            this.cost = jobOrder.cost;
            this.orderNo = jobOrder.orderNo;
            this.orderDate = jobOrder.orderDate;
            this.orderMode = jobOrder.orderMode;
            this.serviceMode = jobOrder.serviceMode;
            this.expectedDate = jobOrder.expectedDate;
            this.employee = jobOrder.employee;
            this.consignor = jobOrder.consignor;
            this.consignorGSTIN = jobOrder.consignorGSTIN;
            this.consignorAddress = jobOrder.consignorAddress;
            this.consignee = jobOrder.consignee;
            this.consigneeGSTIN = jobOrder.consigneeGSTIN;
            this.consigneeAddress = jobOrder.consigneeAddress;
            this.PAN = jobOrder.PAN;
            this.vehicle_placement_no = jobOrder.vehicle_placement_no;
            this.vehicleNo = jobOrder.vehicleNo;
            this.broker = jobOrder.broker;
            this.loadType = jobOrder.loadType;
            this.paymentto = jobOrder.paymentto;


            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);

