
const mongoose = require('mongoose');
const GoodsReceipt = require('./GoodsReceipt'); 

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
    remarks: { type: String }
});


// Define schema for Charges
const chargespodSchema = new Schema({
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
const podSchema = new mongoose.Schema({
    podNo: { type: String, required: true },
    consignmentno: { type: String, required: true },
    date: { type: Date },
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
    vehicle_placement_no: { type: String },
    vehicleNo: { type: String },
    broker: { type: String },
    charges: { type: [chargesSchema] }, 
    vehicleHireCharges: { type: [chargesSchema] }, 
    podcharges: { type: [chargespodSchema], required: false }
});

// Middleware to auto-fill fields from GoodsReceipt and calculate effective price
podSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const goodsReceipt = await GoodsReceipt.findOne({ consignmentno: this.consignmentno });
            if (!goodsReceipt) {
                return next(new Error('GoodsReceipt not found'));
            }
            // Auto-fill fields from GoodsReceipt
            this.customer = goodsReceipt.customer;
            this.from = goodsReceipt.from;
            this.to = goodsReceipt.to;
            this.dimensions = goodsReceipt.dimensions;
            this.weight = goodsReceipt.weight;
            this.quantumrate = goodsReceipt.quantumrate;
            this.effectiverate = goodsReceipt.effectiverate;
            this.cost = goodsReceipt.cost;
            this.orderNo = goodsReceipt.orderNo;
            this.orderDate = goodsReceipt.orderDate;
            this.orderMode = goodsReceipt.orderMode;
            this.serviceMode = goodsReceipt.serviceMode;
            this.expectedDate = goodsReceipt.expectedDate;
            this.employee = goodsReceipt.employee;
            this.consignor = goodsReceipt.consignor;
            this.consignorGSTIN = goodsReceipt.consignorGSTIN;
            this.consignorAddress = goodsReceipt.consignorAddress;
            this.consignee = goodsReceipt.consignee;
            this.consigneeGSTIN = goodsReceipt.consigneeGSTIN;
            this.consigneeAddress = goodsReceipt.consigneeAddress;
            this.vehicle_placement_no = goodsReceipt.vehicle_placement_no;
            this.vehicleNo = goodsReceipt.vehicleNo;
            this.broker = goodsReceipt.broker;
            this.charges = goodsReceipt.charges;
            this.vehicleHireCharges = goodsReceipt.vehicleHireCharges;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('POD', podSchema);


// const mongoose = require('mongoose');
// const GoodsReceipt = require('./GoodsReceipt'); // Adjust the path as necessary

// // Define schema for Goods Receipt
// const podSchema = new mongoose.Schema({
//     podNo: { type: String, required: true },
//     consignmentno: { type: String, required: true },
//     date: { type: Date },
//     jobOrder_no: { type: String },
//     customer: { type: String },
//     from: { type: String },
//     to: { type: String },
//     weight: { type: String },
//     quantumrate: { type: String },
//     dimensions: { type: String },
//     effectiverate: { type: String },
//     cost: { type: String },
//     orderNo: { type: String },
//     orderDate: { type: Date },
//     orderMode: { type: String },
//     serviceMode: { type: String },
//     expectedDate: { type: Date },
//     employee: { type: String },
//     consignor: { type: String },
//     consignorGSTIN: { type: String },
//     consignorAddress: { type: String },
//     consignee: { type: String },
//     consigneeGSTIN: { type: String },
//     consigneeAddress: { type: String },
//     vehicle_placement_no: { type: String },
//     vehicleNo: { type: String },
//     broker: { type: String },
// });

// // Middleware to auto-fill fields from GoodsReceipt and calculate effective price
// podSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         try {
//             const goodsReceipt = await GoodsReceipt.findOne({ consignmentno: this.consignmentno });
//             if (!goodsReceipt) {
//                 return next(new Error('GoodsReceipt not found'));
//             }
//             // Auto-fill fields from GoodsReceipt
//             this.customer = goodsReceipt.customer;
//             this.from = goodsReceipt.from;
//             this.to = goodsReceipt.to;
//             this.dimensions = goodsReceipt.dimensions;
//             this.weight = goodsReceipt.weight;
//             this.quantumrate = goodsReceipt.quantumrate;
//             this.effectiverate = goodsReceipt.effectiverate;
//             this.cost = goodsReceipt.cost;
//             this.orderNo = goodsReceipt.orderNo;
//             this.orderDate = goodsReceipt.orderDate;
//             this.orderMode = goodsReceipt.orderMode;
//             this.serviceMode = goodsReceipt.serviceMode;
//             this.expectedDate = goodsReceipt.expectedDate;
//             this.employee = goodsReceipt.employee;
//             this.consignor = goodsReceipt.consignor;
//             this.consignorGSTIN = goodsReceipt.consignorGSTIN;
//             this.consignorAddress = goodsReceipt.consignorAddress;
//             this.consignee = goodsReceipt.consignee;
//             this.consigneeGSTIN = goodsReceipt.consigneeGSTIN;
//             this.consigneeAddress = goodsReceipt.consigneeAddress;
//             this.vehicle_placement_no = goodsReceipt.vehicle_placement_no;
//             this.vehicleNo = goodsReceipt.vehicleNo;
//             this.broker = goodsReceipt.broker;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('podSchema', podSchema);




// const mongoose = require('mongoose');

// const podSchema = new mongoose.Schema({
//     consignmentNo: { type: String, required: true },
//     receivingDate: { type: Date, required: true },
//     voucherNo: { type: String, required: true },
//     consignmentType: { type: String, required: true },
//     source: { type: String, required: true },
//     destination: { type: String, required: true },
//     consignee: { type: String, required: true },
//     consignor: { type: String, required: true },
//     consignmentDate: { type: Date, required: true },
//     loadingDate: { type: Date, required: true },
//     reportingDate: { type: Date, required: true },
//     unloadingDate: { type: Date, required: true },
//     weight: { type: String, required: true },
//     pkgs: { type: String, required: true },
//     through: { type: String, enum: ['ORIGINAL', 'WHATSAPP', 'EMAIL', 'MOBILE APP'], required: true },
//     status: { type: String, enum: ['OK', 'DAMAGE', 'EXCESS', 'SHORT'], required: true },
//     reportNo: { type: String, required: true },
//     reportSubmitDate: { type: Date, required: true },
//     receiver: { 
//         name: { type: String, required: true },
//         relation: { type: String, required: true },
//         mobNo: { type: String, required: true },
//         phoneNo: { type: String, required: true },
//         email: { type: String, required: true }
//     }
// });

// module.exports = mongoose.model('Pod', podSchema);
