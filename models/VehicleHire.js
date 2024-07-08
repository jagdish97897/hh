const mongoose = require('mongoose');
const GoodsReceipt = require('./GoodsReceipt'); // Adjust the path as necessary

const { Schema } = mongoose;

// Define schema for Charges
const chargesSchema = new Schema({
    sundry: {
        type: String,
        required: true,
        enum: ['Loading On Hire', 'Other Charges On Hire', 'TRANSACTION CHARGES', 'STAFF FUND', 'RTO']
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

// Define schema for Vehicle Hire
const vehicleHireSchema = new Schema({
    vehiclehire_no: { type: String, required: true },
    consignmentno: { type: String, required: true },
    type: { type: String, enum: ['PICKUP', 'DELIVERY', 'SUPPLYMENTRY'], required: true },
    state: { type: String },
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
    PAN: { type: String },
    vehicle_placement_no: { type: String },
    vehicleNo: { type: String },
    broker: { type: String },
    loadType: { type: String },
    paymentto: { type: String },
    charges: { type: [chargesSchema], required: false } // Updated to an array of chargesSchema
});

// Middleware to auto-fill fields from GoodsReceipt and calculate effective price
vehicleHireSchema.pre('save', async function (next) {
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
            this.PAN = goodsReceipt.PAN;
            this.vehicle_placement_no = goodsReceipt.vehicle_placement_no;
            this.vehicleNo = goodsReceipt.vehicleNo;
            this.broker = goodsReceipt.broker;
            this.loadType = goodsReceipt.loadType;
            this.paymentto = goodsReceipt.paymentto;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('VehicleHire', vehicleHireSchema);




// const mongoose = require('mongoose');
// const GoodsReceipt = require('./GoodsReceipt'); // Adjust the path as necessary

// const { Schema } = mongoose;

// const chargesSchema = new Schema({
//     sundry: { type: String, required: true },
//     taxable: { type: Boolean, required: true, default: false },
//     calcOn: { type: String, enum: ['FIXED'], required: true },
//     addDed: { type: String, enum: ['A', 'D'], required: true },
//     rate: { type: Number, required: true, default: 0.00 },
//     amount: { type: Number, required: true, default: 0.00 },
//     gst: { type: Number, required: true, default: 0.00 },
//     total: { type: Number, required: true, default: 0.00 },
//     remarks: { type: String, required: false }
// });

// // Define schema for Vehicle Hire
// const vehicleHireSchema = new Schema({
//     vehiclehire_no: { type: String, required: true },
//     consignmentno: { type: String, required: true },
//     type: { type: String, enum: ['PICKUP', 'DELIVERY', 'SUPPLYMENTRY'], required: true },
//     payto: { type: String, enum: ['OWNER', 'TRANSPORTER'], required: true },
//     state: { type: String },
//     PAN: { type: String },
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
//     loadType: { type: String },
//     charges: { type: chargesSchema, required: false }
// });

// // Middleware to auto-fill fields from GoodsReceipt and calculate effective price
// vehicleHireSchema.pre('save', async function (next) {
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
//             this.loadType = goodsReceipt.loadType;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('VehicleHire', vehicleHireSchema);


// const mongoose = require('mongoose');
// const GoodsReceipt = require('./GoodsReceipt'); // Adjust the path as necessary
// const { Schema } = mongoose;

// const chargesSchema = new Schema({
//     sundry: { type: String, required: true },
//     taxable: { type: Boolean, required: true, default: false },
//     calcOn: { type: String, enum: ['FIXED'], required: true },
//     addDed: { type: String, enum: ['A', 'D'], required: true },
//     rate: { type: Number, required: true, default: 0.00 },
//     amount: { type: Number, required: true, default: 0.00 },
//     gst: { type: Number, required: true, default: 0.00 },
//     total: { type: Number, required: true, default: 0.00 },
//     remarks: { type: String, required: false }
//   });
// // Define schema for Goods Receipt
// const vehicleHireSchema = new mongoose.Schema({
//     vehiclehire_no: { type: String, required: true },
//     consignmentno: { type: String, required: true },
//     type: { type: String, enum: ['PICKUP', 'DELIVERY','SUPPLYMENTRY'], required: true },
//     payto: { type: String, enum: ['OWNER', 'TRANSPORTER'], required: true },
//     state: { type: String },
//     PAN: { type: String },
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
//     loadType: { type: String },
//     charges:chargesSchema
// });

// // Middleware to auto-fill fields from GoodsReceipt and calculate effective price
// vehicleHireSchema.pre('save', async function (next) {
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
//             this.loadType = goodsReceipt.loadType;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('VehicleHire', vehicleHireSchema);




// const mongoose = require('mongoose');

// // Define ENUMs
// const DocumentTypeEnum = ['vehicle hire', 'vehicle hire auto'];
// const TypeEnum = ['main', 'pickup', 'delivery', 'supplementary'];
// const LoadTypeEnum = ['20 FT CLOSE BODY', '20 FT CONTAINER', '20 FT DALA BODY', '22 FT LPT', '24 FT CONTAINER', '30 FT CONTAINER', '32 FT CONTAINER MXL', '32 FT CONTAINER SXL', '32 FT TROLLA', '40 FT CONTAINER', '4923 PRIME MOVER', '50 FT TRAILER XXXL', 'BY HAND PICKUP', 'CENTER', 'CLOUSE TAURAS', 'CLOSED BODY TRUCK', 'FTL', 'HIGH BED TRAILER', 'JCB'];
// const PayToTransporterEnum = ['OWNER', 'TRANSPORTER'];
// const ReportingEnum = ['REPORT1', 'REPORT2', 'REPORT3']; // Example values, replace with actual reporting options
// const ModeEnum = ['AIR', 'RAIL', 'ROAD', 'SEA']; // Example values, replace with actual mode options

// // Define schema for Vehicle Hire
// const vehicleHireSchema = new mongoose.Schema({
//     document_type: { type: String, enum: DocumentTypeEnum, required: true },
//     type: { type: String, enum: TypeEnum, required: true },
//     broker_name: String,
//     vehicle_number: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     source: { type: String, required: true },
//     destination: { type: String, required: true },
//     via: String,
//     multiple_delivery_point: Boolean,
//     manifest_no: String,
//     placement_no: String,
//     contents: String,
//     vehicle: String,
//     load_type: { type: String, enum: LoadTypeEnum },
//     pay_to_transporter: { type: String, enum: PayToTransporterEnum, required: true },
//     state: String,
//     pan: String,
//     reporting: { type: String, enum: ReportingEnum },
//     expected_delivery_date: Date,
//     mode: { type: String, enum: ModeEnum },
//     placed_by: { type: String, enum: ['BROKER', 'DIRECT'] },
//     total: {
//         base: Number,
//         guaranteed_weight: Number,
//         kanta_weight: Number,
//         slip_no: String
//     },
//     vehicle_details: {
//         owner: String,
//         address: String,
//         pan: String,
//         mobile: String,
//         photo1: String,
//         photo2: String
//     },
//     driver_profile: {
//         name: String,
//         address: String,
//         mobile: String,
//         lic_no: String,
//         photo1: String,
//         photo2: String
//     },
//     broker_profile: {
//         mobile_no: String,
//         document_type: String,
//         photo1: String
//     }
// });

// module.exports = mongoose.model('VehicleHire', vehicleHireSchema);





// const mongoose = require('mongoose');

// const vehicleHireSchema = new mongoose.Schema({
//     documentType: { type: String, required: true },
//     brokerNameForPri: { type: String, required: true },
//     brokerNumber: { type: String, required: true },
//     date: { type: Date, required: true },
//     source: { type: String, required: true },
//     destination: { type: String, required: true },
//     via: { type: String, required: true },
//     multipleDeliveryPoint: { type: Boolean, required: true },
//     manifestNo: { type: String, required: true },
//     placementNumber: { type: String, required: true },
//     contentsNo: { type: String, required: true },
//     vehicle: { type: String, required: true },
//     loadType: { type: String, required: true },
//     payToTransporter: {
//         type: String,
//         enum: ["OWNER", "TRANSPORTER", "SELECT"],
//         required: true
//     },
//     payToTransportercontains: { type: String, required: true },
//     state: { type: String, required: true },
//     PAN: { type: String, required: true },
//     reporting: { type: String, required: true },
//     expectedDeliveryDate: { type: Date, required: true },
//     mode: {
//         type: String,
//         enum: ["ROAD", "AIR", "BY HAND", "CARGO", "EXPRESS", "MULTI MODEL", "TRAIN"],
//         required: true
//     },
//     placedBy: { type: String, required: true },

//     interState: {
//         rcm: String,
//         inputCredit: String,
//         base: String,
//         guaranteedWeight: String,
//         kantaWeight: String,
//         slipNo: String,
//         calculationOn: String,
//         capacity: String,
//         rate: String,
//         reasonForWeightLoss: String,
//         rateContractRate: String
//     },

//     incentiveAndPenaltyTransporterRateContract: {
//         postingType: String,
//         postingDebitAc: String,
//         hireFreight: String,
//         otherCharges: String,
//         grossHireFreight: String,
//         gstOnHire: String,
//         gstOnCharges: String,
//         roundOff: String,
//         totalHire: String,
//         gst: String,
//         cess: String
//     },

//     advance: {
//         advanceAmount: String,
//         cardAmount: String,
//         total: String,
//         fuelAmt: String,
//         advanceTotal: String
//     },

//     balance: {
//         lessTDS: String,
//         payToDriver: String,
//         payableAt: String,
//         balanceHire: String,
//         balanceAc: String,
//         thirdPartyLoadingCostCentre: String,
//         thirdPartyLoadingAc: String
//     },

//     charges: {
//         sundries: String,
//         texable: String,
//         calcOn: String,
//         addDeb: String,
//         rate: String,
//         amount: String,
//         gst: String,
//         total: String,
//         remarks: String
//     },

//     vehicleDetails: {
//         owner: String,
//         insurancePolicyNo: String,
//         validUpto: Date,
//         address: String,
//         insuranceCompany: String,
//         pan: String,
//         mobile: String,
//         pucNo: String,
//         pucValidUpto: Date,
//         engineNo: String,
//         chassisNo: String,
//         permitNo: String,
//         permitValidity: Date,
//         gpsDeviceNo: String,
//         hypothecatedReason: String,
//         hypothecatedBy: String,
//         attach: String,
//         attach2: String
//     },

//     driversProfile: {
//         name: String,
//         address: String,
//         authority: String,
//         mobile: String,
//         licNo: String,
//         issueDate: Date,
//         validUpto: Date,
//         attach: String,
//         attach2: String
//     },

//     brokerProfile: {
//         mobileNo: String,
//         documentType: String,
//         attach: String
//     },

//     other: {
//         refNo: String,
//         refDate: Date
//     },

//     remarks: String
// });

// module.exports = mongoose.model('VehicleHire', vehicleHireSchema);