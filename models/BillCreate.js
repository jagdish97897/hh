
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
const chargesbillSchema = new Schema({
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
const billSchema = new mongoose.Schema({
    billNo: { type: String, required: true },
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
    billcharges: { type: [chargesbillSchema], required: false }
});

// Middleware to auto-fill fields from GoodsReceipt and calculate effective price
billSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('Billcreate', billSchema);




// const mongoose = require('mongoose');
// const Pod = require('./Pod'); 

// // Define schema for Goods Receipt
// const billSchema = new mongoose.Schema({
//     billNo: { type: String, required: true },
//     podNo: { type: String, required: true },
//     consignmentno: { type: String },
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

// // Middleware to auto-fill fields from Pod and calculate effective price
// billSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         try {
//             const podDocument = await Pod.findOne({ podNo: this.podNo });
//             if (!podDocument) {
//                 return next(new Error('Pod not found'));
//             }
//             // Auto-fill fields from Pod
//             this.customer = podDocument.customer;
//             this.from = podDocument.from;
//             this.to = podDocument.to;
//             this.dimensions = podDocument.dimensions;
//             this.weight = podDocument.weight;
//             this.quantumrate = podDocument.quantumrate;
//             this.effectiverate = podDocument.effectiverate;
//             this.cost = podDocument.cost;
//             this.orderNo = podDocument.orderNo;
//             this.orderDate = podDocument.orderDate;
//             this.orderMode = podDocument.orderMode;
//             this.serviceMode = podDocument.serviceMode;
//             this.expectedDate = podDocument.expectedDate;
//             this.employee = podDocument.employee;
//             this.consignor = podDocument.consignor;
//             this.consignorGSTIN = podDocument.consignorGSTIN;
//             this.consignorAddress = podDocument.consignorAddress;
//             this.consignee = podDocument.consignee;
//             this.consigneeGSTIN = podDocument.consigneeGSTIN;
//             this.consigneeAddress = podDocument.consigneeAddress;
//             this.vehicle_placement_no = podDocument.vehicle_placement_no;
//             this.vehicleNo = podDocument.vehicleNo;
//             this.broker = podDocument.broker;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('Billcreate', billSchema);


// const mongoose = require('mongoose');
// const Pod = require('./Pod'); // Adjust the path as necessary

// // Define schema for Goods Receipt
// const billSchema = new mongoose.Schema({
//     billNo: { type: String, required: true },
//     podNo: { type: String, required: true },
//     consignmentno: { type: String },
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
// billSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         try {
//             const Pod = await Pod.findOne({ podNo: this.podNo });
//             if (!Pod) {
//                 return next(new Error('GoodsReceipt not found'));
//             }
//             // Auto-fill fields from GoodsReceipt
//             this.customer = Pod.customer;
//             this.from = Pod.from;
//             this.to = Pod.to;
//             this.dimensions = Pod.dimensions;
//             this.weight = Pod.weight;
//             this.quantumrate = Pod.quantumrate;
//             this.effectiverate = Pod.effectiverate;
//             this.cost = Pod.cost;
//             this.orderNo = Pod.orderNo;
//             this.orderDate = Pod.orderDate;
//             this.orderMode = Pod.orderMode;
//             this.serviceMode = Pod.serviceMode;
//             this.expectedDate = Pod.expectedDate;
//             this.employee = Pod.employee;
//             this.consignor = Pod.consignor;
//             this.consignorGSTIN = Pod.consignorGSTIN;
//             this.consignorAddress = Pod.consignorAddress;
//             this.consignee = Pod.consignee;
//             this.consigneeGSTIN = Pod.consigneeGSTIN;
//             this.consigneeAddress = Pod.consigneeAddress;
//             this.vehicle_placement_no = Pod.vehicle_placement_no;
//             this.vehicleNo = Pod.vehicleNo;
//             this.broker = Pod.broker;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('billSchema', billSchema);







// const mongoose = require('mongoose');

// const billCreateSchema = new mongoose.Schema({
//     voucherType: { type: String, required: true },
//     type: { type: String, required: true },
//     customer: { type: String, required: true },
//     billNo: { type: String, required: true },
//     date: { type: Date, required: true },
//     POS: { type: String, required: true },
//     location: { type: String, required: true },
//     source: { type: String, required: true },
//     against: { type: String, required: true },
//     dueDate: { type: Date },
//     GSTOnFreight: { type: String, required: true },
//     rateOn: { type: String, required: true },
//     subject: { type: String, required: true },
//     costCenter: { type: String, required: true },
//     consignment: { type: String, required: true },

//     total: {
//         base: { type: String, required: true },
//         PKGS: { type: String, required: true },
//         weight: { type: String, required: true },
//         freight: { type: String, required: true },
//         gross: { type: String, required: true },
//         gstOnFreight: { type: String, required: true },
//         gstOnCharges: { type: String, required: true },
//         otherCharges: { type: String, required: true },
//         taxable: { type: String, required: true },
//         nonTaxable: { type: String, required: true },
//         total: { type: String, required: true },
//         advanceReceivable: { type: String, required: true },
//         IGST: { type: String, required: true },
//         CGST: { type: String, required: true },
//         CESS: { type: String, required: true },
//         TDSAmount: { type: String, required: true },
//         net: { type: String, required: true }
//     },

//     // charge: {
//     //     billSunderis: {
//     //         statisticalCharges: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         loadingCharges: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         otherCharges: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         loadingDetention: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         odcLength: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         ODCWIDTH: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         ODCHEIGHT: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOUTTARPRADESH: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTORAJASTHAN: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOMAHARASATRA: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         ENVIRONMENTCOMENSATIONCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         MAHARASTRAPERMISSION: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         UNLOADINGCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOGUJARAT: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         WAREHOUSECHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         UNLOADINGDETENTION: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         DETENTIONCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         TWOPOINTUNLOADING: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOODISHA: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         EXTRAWEIGHTCHG: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         TWOPOINTLOADING: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOTRIPURA: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RToBIHAR: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         DISCOUNT: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOCHHATTISGARH: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         VEHICLERETURNCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         TOLLTAX: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         MOBILIZATIONCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         TRANSHIPMENTCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         CRANECHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOKARNATAKA: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         THREEPOINTLOADING: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         DOUBLEDRIVERCHG: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         FASTDELIVERYCHG: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         LABOURCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         SURCHARGE: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         DEMOBILIZATIONCHARGES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         REIMBURSEMENT: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         FIVEPOINTUNLOADING: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         PICKUPFROMBALLABHGARH: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         EXTRACOMPLIANCES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         },
//     //         RTOEXPENSES: {
//     //             amount: { type: String, required: true },
//     //             gst: { type: String, required: true },
//     //             total: { type: String, required: true }
//     //         }
           
//     //     }
//     // },

//     others: {
//         interstate: { type: String , enum:["true","false"] },
//         reverseCharges: { type: String , enum:["true","false"] },
//         itemCode:  String ,
//         description:  String ,
//         poJobNo:  String ,
//         poJobDate:  Date ,
//         wccSbNo:  String ,
//         wccSbDate:  Date ,
//         siteName:  String ,
//         siteID:  String ,
//         receiptNo:  String ,
//         receiptDate:  Date ,
//         SACCode:  String ,
//         paymentBank:  String 
//     },

//     remarks: String 
// });

// module.exports = mongoose.model('BillCreate', billCreateSchema);