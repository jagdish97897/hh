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

// const mongoose = require('mongoose');
// const VehiclePlacement = require('./VehiclePlacement'); // Import the VehiclePlacement model
// const { Schema } = mongoose;

// const itemSchema = new Schema({
//     from: {
//       type: String,
//       required: true
//     },
//     to: [{
//       destination: {
//         type: String,
//         required: true
//       },
//       distance: {
//         type: String,
//         required: true
//       }
//     }],
//     QUANTUMRATE: { type: Number },
//     EFFECTIVERATE: { type: Number },
//   });
// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     consignmentno: { type: String, required: true },
//     vehicle_placement_no: { type: String, required: true },
//     date: { type: Date, required: true },
//     paymentto: { type: String },
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
//     additem: [itemSchema],

//     container: {
//         linename: { type: String },
//         date: { type: Date },
//         loc: { type: String },
//         cgw: { type: String },
//         loadingno: { type: String },
//         loadingdate: { type: Date },
//         remarks: { type: String },
//     },
//     cod: {
//         favouring: { type: String },
//         amount: { type: Number, default: 0 },
//         mode: { 
//             type: String, 
//             enum: ['CHEQUE', 'ATM', 'CASH', 'DD', 'ECS', 'NEFT', 'IMPS', 'RTGS'],
//             default: 'CASH'
//         },
//         cancelReason: { type: String },
//     }
// });

// // Middleware to auto-fill fields from VehiclePlacement
// goodsReceiptSchema.pre('save', async function (next) {
//     if (this.isNew) { // Only run this middleware when the document is new
//         try {
//             const vehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no: this.vehicle_placement_no });
//             if (!vehiclePlacement) {
//                 return next(new Error('VehiclePlacement not found'));
//             }
//             // Auto-fill fields from VehiclePlacement
//             this.date = vehiclePlacement.date;
//             this.paymentto = vehiclePlacement.paymentto;
//             this.jobOrder_no = vehiclePlacement.jobOrder_no;
//             this.customer = vehiclePlacement.customer;
//             this.from = vehiclePlacement.from;
//             this.to = vehiclePlacement.to;
//             this.dimensions = vehiclePlacement.dimensions;
//             this.weight = vehiclePlacement.weight;
//             this.quantumrate = vehiclePlacement.quantumrate;
//             this.effectiverate = vehiclePlacement.effectiverate;
//             this.cost = vehiclePlacement.cost;
//             this.orderNo = vehiclePlacement.orderNo;
//             this.orderDate = vehiclePlacement.orderDate;
//             this.orderMode = vehiclePlacement.orderMode;
//             this.serviceMode = vehiclePlacement.serviceMode;
//             this.expectedDate = vehiclePlacement.expectedDate;
//             this.employee = vehiclePlacement.employee;
//             this.consignor = vehiclePlacement.consignor;
//             this.consignorGSTIN = vehiclePlacement.consignorGSTIN;
//             this.consignorAddress = vehiclePlacement.consignorAddress;
//             this.consignee = vehiclePlacement.consignee;
//             this.consigneeGSTIN = vehiclePlacement.consigneeGSTIN;
//             this.consigneeAddress = vehiclePlacement.consigneeAddress;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);






// const mongoose = require('mongoose');
// const VehiclePlacement = require('./VehiclePlacement'); // Import the VehiclePlacement model

// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     consignmentno: { type: String, required: true },
//     vehicle_placement_no: { type: String, required: true },
//     jobOrder_no: { type: String, required: true },
//     date: { type: Date, required: true },
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
//     consignee: { type: String },

//     container: {
//         linename: { type: String },
//         date: { type: Date },
//         loc: { type: String },
//         cgw: { type: String },
//         loadingno: { type: String },
//         loadingdate: { type: Date },
//         remarks: { type: String },
//     },
//     cod: {
//         favouring: { type: String },
//         amount: { type: Number, default: 0 },
//         mode: { 
//             type: String, 
//             enum: ['CHEQUE', 'ATM', 'CASH', 'DD', 'ECS', 'NEFT', 'IMPS', 'RTGS'],
//             default: 'CASH'
//         },
//         cancelReason: { type: String },
//     }
// });

// // Middleware to auto-fill fields from VehiclePlacement
// goodsReceiptSchema.pre('save', async function (next) {
//     if (this.isNew) { // Only run this middleware when the document is new
//         try {
//             const vehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no: this.vehicle_placement_no });
//             if (!vehiclePlacement) {
//                 return next(new Error('VehiclePlacement not found'));
//             }
//             // Auto-fill fields from VehiclePlacement
//             this.date = vehiclePlacement.date;
//             this.jobOrder_no = vehiclePlacement.jobOrder_no;
//             this.customer = vehiclePlacement.customer;
//             this.from = vehiclePlacement.from;
//             this.to = vehiclePlacement.to;
//             this.dimensions = vehiclePlacement.dimensions;
//             this.weight = vehiclePlacement.weight;
//             this.quantumrate = vehiclePlacement.quantumrate;
//             this.effectiverate = vehiclePlacement.effectiverate;
//             this.cost = vehiclePlacement.cost;
//             this.orderNo = vehiclePlacement.orderNo;
//             this.orderDate = vehiclePlacement.orderDate;
//             this.orderMode = vehiclePlacement.orderMode;
//             this.serviceMode = vehiclePlacement.serviceMode;
//             this.expectedDate = vehiclePlacement.expectedDate;
//             this.employee = vehiclePlacement.employee;
//             this.consignor = vehiclePlacement.consignor;
//             this.consignee = vehiclePlacement.consignee;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);



// const mongoose = require('mongoose');
// const VehiclePlacement = require('./VehiclePlacement');

// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     consignmentno: { type: String, required: true },
//     vehicle_placement_no: { type: String, required: true },
//     date: { type: String, required: true },

//     container: {
//         linename: { type: String },
//         date: { type: Date },
//         loc: { type: String },
//         cgw: { type: String },
//         loadingno: { type: String },
//         loadingdate: { type: Date },
//         remarks: { type: String },
//     },
//     cod: {
//         favouring: { type: String },
//         amount: { type: Number, default: 0 },
//         mode: { 
//             type: String, 
//             enum: ['CHEQUE', 'ATM', 'CASH', 'DD', 'ECS', 'NEFT', 'IMPS', 'RTGS'],
//             default: 'CASH'
//         },
//         cancelReason: { type: String },
//     }
// });

// // Middleware to auto-fill fields from JobOrder
// goodsReceiptSchema.pre('save', async function (next) {
//     if (this.isNew) { // Only run this middleware when the document is new
//         try {
//             const VehiclePlacement = await VehiclePlacement.findOne({ vehicle_placement_no: this.vehicle_placement_no });
//             if (!VehiclePlacement) {
//                 return next(new Error('VehiclePlacement not found'));
//             }
//             // Auto-fill fields from JobOrder
//             this.date = jobOrder.date;


//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);



// const mongoose = require('mongoose');
// const JobOrder = require('./JobOrder');

// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     consignmentno: { type: String, required: true },
//     jobOrder_no: { type: String, required: true },
//     customer: { type: String },
//     from: { type: String },
//     to: { type: String },
//     orderNo: { type: String },
//     orderDate: { type: Date },
//     orderMode: { type: String },
//     serviceMode: { type: String },
//     expectedDate: { type: Date },
//     employee: { type: String },
//     consignor: { type: String },
//     consignee: { type: String },

//     container: {
//         linename: { type: String },
//         date: { type: Date },
//         loc: { type: String },
//         cgw: { type: String },
//         loadingno: { type: String },
//         loadingdate: { type: String },
//         remarks: { type: String },
//     },

// });

// // Middleware to auto-fill fields from JobOrder and VehicleRegistration
// goodsReceiptSchema.pre('save', async function (next) {
//     if (this.isNew) { // Only run this middleware when the document is new
//         try {
//             const jobOrder = await JobOrder.findOne({ jobOrder_no: this.jobOrder_no });
//             if (!jobOrder) {
//                 return next(new Error('JobOrder not found'));
//             }

//             // Auto-fill fields from JobOrder
//             this.customer = jobOrder.customer;
//             this.from = jobOrder.from;
//             this.to = jobOrder.to;
//             this.orderNo = jobOrder.orderNo;
//             this.orderDate = jobOrder.orderDate;
//             this.orderMode = jobOrder.orderMode;
//             this.serviceMode = jobOrder.serviceMode;
//             this.expectedDate = jobOrder.expectedDate;
//             this.employee = jobOrder.employee;
//             this.consignor = jobOrder.consignor;
//             this.consignee = jobOrder.consignee;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);


// const mongoose = require('mongoose');
// const JobOrder = require('./JobOrder'); 


// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     consignmentno:{type: String, required:true},
//     jobOrder_no: { type: String, required: true },

//     customer: { type: String },
//     from: { type: String },
//     to: { type: String },
//     orderNo: { type: String },
//     orderDate: { type: Date },
//     orderMode: { type: String },
//     serviceMode: { type: String },
//     expectedDate: { type: Date },
//     employee: { type: String },
//     consignor: { type: String },
//     consignee: { type: String },

//     container: {
//         linename: { type: String },
//         date:Date,
//         loc: { type: String },
//         cgw: { type: String },
//         loadingno: { type: String },
//         loadingdate: { type: String},
//         Remarks: String,
//     },
//     cod:{
//         favouring:{type: String},
//         amount:{type: Number},
//         mode: { type: String, enum: ['CHEQUE', 'ATM','CASH','DD','ECS','NEFT','IMPS','RTGS' ] },
//         cancelreasion:{type: String},

//     }
 
// });


// // Middleware to auto-fill fields from JobOrder and VehicleRegistration
// goodsReceiptSchema.pre('save', async function (next) {
//     if (this.isNew) { // Only run this middleware when the document is new
//         try {
//             const jobOrder = await JobOrder.findOne({ jobOrder_no: this.jobOrder_no });
//             if (!jobOrder) {
//                 return next(new Error('JobOrder not found'));
//             }


//             // Auto-fill fields from JobOrder
//             this.customer = jobOrder.customer;
//             this.from = jobOrder.from;
//             this.to = jobOrder.to;
//             this.orderNo = jobOrder.orderNo;
//             this.orderDate = jobOrder.orderDate;
//             this.orderMode = jobOrder.orderMode;
//             this.serviceMode = jobOrder.serviceMode;
//             this.expectedDate = jobOrder.expectedDate;
//             this.employee = jobOrder.employee;
//             this.consignor = jobOrder.consignor;
//             this.consignee = jobOrder.consignee;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });
// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);


// const mongoose = require('mongoose');



// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     jobOrder_no: { type: String, required: true },
//     container: {
//         linename: { type: String },
//         date:Date,
//         loc: { type: String },
//         cgw: { type: String },
//         loadingno: { type: String },
//         loadingdate: { type: String},
//         Remarks: String,
//     },
 
// });

// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);



// const mongoose = require('mongoose');

// // Define ENUMs
// const DocumentTypeEnum = ['CONSIGNMENT AUTO', 'CN LOCAL MOVEMENT', 'CONSIGNMENT NOTE'];
// const TypeEnum = ['DOMESTIC', 'CARGO', 'CUSTOMS CLEARING SERVICES', 'DANGEROUS CARGO', 'DOCUMENT', 'DOCUMENT DAY DEFINITE DELIVERY', 'DOMISTIC AIRFREIGHT', 'DOMESTIC BOX', 'DOMESTIC DOCUMENT BY AIR', 'DOMESTIC PARCEL BY EXPRESS', 'DOMESTIC PARCEL BY TRAIN', 'DOMESTIC PARCEL BY TRUCK', 'ECO', 'E-COMMERCE', 'EXPRESS IMPORT', 'FTL', 'GLOBAL MAILING SERVICES', 'HGMV', 'INDUSTRIAL PROJECT TRANSPORTATION', 'INTERCONTINENTAL DIRECT', 'INTERNATIONAL', 'INTERNATIONAL BOX', 'INTERNATIONAL DOCUMENT EXPRESS', 'INTERNATIONAL OCEAN FREIGHT', 'INTERNATIONAL PARCEL', 'INTERNATIONAL PARCELS EXPRESS', 'OTHER', 'OWN', 'PARCEL', 'PO', 'SAARC SURFACE', 'SO', 'TEMPERATURE CONTROLLED CARGO', 'TRADE FAIRES AND EVENTS', 'TRADE FAIRS AND EVENTS'];
// const AgainstEnum = ['DIRECT', 'ORDER', 'PLACEMENT', 'RC PO NO'];
// const PaymentTermEnum = ['TO BB', 'CASH', 'FOC', 'TO PAY'];
// const ModeEnum = ['ROAD', 'AIR', 'BY HAND', 'CARGO', 'EXPRESS', 'MULTI MODEL', 'TRAIN'];
// const DeliveryAtEnum = ['DIRECT', 'DOOR', 'DOOR TO DOOR', 'DOOR TO TERMINAL', 'GODOWN', 'LOCAL DELIVERY', 'TERMINAL TO DOOR', 'TERMINAL TO TERMINAL'];

// // Define schema for Goods Receipt
// const goodsReceiptSchema = new mongoose.Schema({
//     document_type: { type: String, enum: DocumentTypeEnum, required: true },
//     type: { type: String, enum: TypeEnum, required: true },
//     against: { type: String, enum: AgainstEnum, required: true },
//     date: { type: Date, default: Date.now },
//     consignment_no: { type: String, required: true },
//     source: { type: String, required: true },
//     destination: { type: String, required: true },
//     via: String,
//     container_no: String,
//     seal_no: String,
//     route: String,
//     distance: Number,
//     vehicle: String,
//     payment_term: { type: String, enum: PaymentTermEnum },
//     mode: { type: String, enum: ModeEnum },
//     at: String,
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
//     billing_party: {
//         name: String,
//         location: String,
//         gstin: String
//     },
//     delivery_at: { type: String, enum: DeliveryAtEnum },
//     delivery_address: String
// });

// module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);
