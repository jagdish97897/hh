const mongoose = require('mongoose');
const VehiclePlacement = require('./VehiclePlacement'); // Import the VehiclePlacement model

// Define schema for Goods Receipt
const goodsReceiptSchema = new mongoose.Schema({
    consignmentno: { type: String, required: true },
    vehicle_placement_no: { type: String, required: true },
    date: { type: Date, required: true },
    paymentto: { type: String },
    jobOrder_no: { type: String },
    customer: { type: String },
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

// Middleware to auto-fill fields from VehiclePlacement
goodsReceiptSchema.pre('save', async function (next) {
    if (this.isNew) { // Only run this middleware when the document is new
        try {
            const vehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no: this.vehicle_placement_no });
            if (!vehiclePlacement) {
                return next(new Error('VehiclePlacement not found'));
            }
            // Auto-fill fields from VehiclePlacement
            this.date = vehiclePlacement.date;
            this.paymentto = vehiclePlacement.paymentto;
            this.jobOrder_no = vehiclePlacement.jobOrder_no;
            this.customer = vehiclePlacement.customer;
            this.from = vehiclePlacement.from;
            this.to = vehiclePlacement.to;
            this.dimensions = vehiclePlacement.dimensions;
            this.weight = vehiclePlacement.weight;
            this.quantumrate = vehiclePlacement.quantumrate;
            this.effectiverate = vehiclePlacement.effectiverate;
            this.cost = vehiclePlacement.cost;
            this.orderNo = vehiclePlacement.orderNo;
            this.orderDate = vehiclePlacement.orderDate;
            this.orderMode = vehiclePlacement.orderMode;
            this.serviceMode = vehiclePlacement.serviceMode;
            this.expectedDate = vehiclePlacement.expectedDate;
            this.employee = vehiclePlacement.employee;
            this.consignor = vehiclePlacement.consignor;
            this.consignorGSTIN = vehiclePlacement.consignorGSTIN;
            this.consignorAddress = vehiclePlacement.consignorAddress;
            this.consignee = vehiclePlacement.consignee;
            this.consigneeGSTIN = vehiclePlacement.consigneeGSTIN;
            this.consigneeAddress = vehiclePlacement.consigneeAddress;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);