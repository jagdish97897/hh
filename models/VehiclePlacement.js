const mongoose = require('mongoose');
const JobOrder = require('./JobOrder'); // Import the JobOrder model

// Define schema for VehiclePlacement
const vehiclePlacementSchema = new mongoose.Schema({
    vehicle_placement_no: { type: String, required: true },
    date: { type: Date, required: true },
    jobOrder_no: { type: String, required: true },
    // Fields to be auto-filled from JobOrder
    customer: { type: String },
    from: { type: String },
    to: { type: String },
    orderNo: { type: String },
    orderDate: { type: Date },
    orderMode: { type: String },
    serviceMode: { type: String },
    expectedDate: { type: Date },
    employee: { type: String },
    consignor: { type: String },
    consignee: { type: String },
});

// Middleware to auto-fill fields from JobOrder
vehiclePlacementSchema.pre('save', async function (next) {
    if (this.isNew) { // Only run this middleware when the document is new
        try {
            const jobOrder = await JobOrder.findOne({ jobOrder_no: this.jobOrder_no });

            if (!jobOrder) {
                return next(new Error('JobOrder not found'));
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
            this.consignee = jobOrder.consignee;

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
