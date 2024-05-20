const mongoose = require('mongoose');

// Define ENUMs
const AgainstEnum = ['INDENT', 'DIRECT', 'ORDER', 'QUOTATION'];
const FreightCalcOnTypeEnum = ['FIX', 'WEIGHT', 'PKGS'];

// Define schema for VehicleDetails
const vehicleDetailsSchema = new mongoose.Schema({
    vehicle_no: String,
    load_type: String,
    transporter: String,
    transporter_mobile: String,
    broker_name: String,
    broker_mobile: String,
    driver: String,
    driver_mobile: String,
    license_no: String,
    validity: Date,
    payment_through: String,
    payment_to: String,
    approved_status: Boolean,
    approved_comments: String
});

// Define schema for Weight
const weightSchema = new mongoose.Schema({
    guaranteed: Number,
    to_load: Number,
    freight_calc_on_type: {
        type: String,
        enum: FreightCalcOnTypeEnum
    }
});

// Define schema for OtherDetails
const otherDetailsSchema = new mongoose.Schema({
    pickup_date: Date,
    mode: String,
    commodity: String
});

// Define schema for VehiclePlacement
const vehiclePlacementSchema = new mongoose.Schema({
    vehicle_placement_no: String,
    date: Date,
    job_order_no: String,
    customer: String,
    against: {
        type: String,
        enum: AgainstEnum
    },
    vehicle_no: String,
    source: String,
    destination: String,
    vehicle_details: vehicleDetailsSchema,
    weight: weightSchema,
    other_details: otherDetailsSchema
});

// Create and export the VehiclePlacement model
module.exports = mongoose.model('VehiclePlacement', vehiclePlacementSchema);
