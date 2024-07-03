const mongoose = require('mongoose');
const JobOrder = require('./JobOrder'); // Import the JobOrder model
const VehicleRegistration = require('./VehicleRegistation'); // Import the VehicleRegistration model

// Define schema for VehiclePlacement
const vehiclePlacementSchema = new mongoose.Schema({
    vehicle_placement_no: { type: String, required: true },
    date: { type: Date, required: true },
    paymentto: { type: String, enum: ['BROKER', 'OWNER'] },
    jobOrder_no: { type: String, required: true },
    vehicleNo: { type: String, required: true },

    broker: { type: String },
    owner: { type: String },
    loadType: { type: String },
    ownerPhone: { type: String },
    brokerPhone: { type: String },
    // Fields to be auto-filled from JobOrder
    customer: { type: String },
    dimensions: { type: String },
    from: { type: String },
    to: { type: String },
    weight: { type: String },
    quantumrate: { type: String },
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
    brokerdetails: {
        name: { type: String, required: true },
        Address: { type: String, required: true },
        City: { type: String, required: true },
        PIN: { type: String, required: true },
        State: { type: String, required: true },
        Country: { type: String, required: true },
        Mobile: { type: String, required: true },
        Email: { type: String, required: true },
        PAN: String,
        photo:String,
        Remarks: String,
    }
});

// Middleware to auto-fill fields from JobOrder and VehicleRegistration
vehiclePlacementSchema.pre('save', async function (next) {
    if (this.isNew) { // Only run this middleware when the document is new
        try {
            const jobOrder = await JobOrder.findOne({ jobOrder_no: this.jobOrder_no });
            if (!jobOrder) {
                return next(new Error('JobOrder not found'));
            }

            const vehicleRegistration = await VehicleRegistration.findOne({ vehicleNo: this.vehicleNo });
            if (!vehicleRegistration) {
                return next(new Error('VehicleRegistration not found'));
            }

            // Auto-fill fields from JobOrder
            this.customer = jobOrder.customer;
            this.from = jobOrder.from;
            this.to = jobOrder.to;
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

            // Auto-fill fields from VehicleRegistration
            this.broker = vehicleRegistration.broker;
            this.owner = vehicleRegistration.owner;
            this.loadType = vehicleRegistration.loadType;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Create and export the VehiclePlacement model
module.exports = mongoose.model('VehiclePlacement', vehiclePlacementSchema);



// const mongoose = require('mongoose');
// const JobOrder = require('./JobOrder'); // Import the JobOrder model

// // Define schema for VehiclePlacement
// const vehiclePlacementSchema = new mongoose.Schema({
//     vehicle_placement_no: { type: String, required: true },
//     date: { type: Date, required: true },
//     jobOrder_no: { type: String, required: true },
//     // Fields to be auto-filled from JobOrder
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
// });

// // Middleware to auto-fill fields from JobOrder
// vehiclePlacementSchema.pre('save', async function (next) {
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

// // Create and export the VehiclePlacement model
// module.exports = mongoose.model('VehiclePlacement', vehiclePlacementSchema);



// const mongoose = require('mongoose');
// const JobOrder = require('./JobOrder'); // Import the JobOrder model

// // Define schema for VehiclePlacement
// const vehiclePlacementSchema = new mongoose.Schema({
//     vehicle_placement_no: String,
//     date: Date,
//     jobOrder_no: {
//         type: String,
//         required: true
//     },
//     // Fields to be auto-filled from JobOrder
//     // Define all the fields you want to auto-fill here
//     // For example:
//     customer: { type: String },
//     from: { type: String },
//     to: { type: String },
//     // Add other fields as needed
// });

// // Middleware to auto-fill fields from JobOrder
// vehiclePlacementSchema.pre('save', async function (next) {
//     try {
//         const jobOrder = await JobOrder.findOne({ jobOrder_no: this.jobOrder_no });

//         if (!jobOrder) {
//             return next(new Error('JobOrder not found'));
//         }

//         // Auto-fill fields from JobOrder
//         this.customer = jobOrder.customer;
//         this.from = jobOrder.from;
//         this.to = jobOrder.to;
//         // Populate other fields as needed

//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Create and export the VehiclePlacement model
// module.exports = mongoose.model('VehiclePlacement', vehiclePlacementSchema);
