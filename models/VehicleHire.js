const mongoose = require('mongoose');

// Define ENUMs
const DocumentTypeEnum = ['vehicle hire', 'vehicle hire auto'];
const TypeEnum = ['main', 'pickup', 'delivery', 'supplementary'];
const LoadTypeEnum = ['20 FT CLOSE BODY', '20 FT CONTAINER', '20 FT DALA BODY', '22 FT LPT', '24 FT CONTAINER', '30 FT CONTAINER', '32 FT CONTAINER MXL', '32 FT CONTAINER SXL', '32 FT TROLLA', '40 FT CONTAINER', '4923 PRIME MOVER', '50 FT TRAILER XXXL', 'BY HAND PICKUP', 'CENTER', 'CLOUSE TAURAS', 'CLOSED BODY TRUCK', 'FTL', 'HIGH BED TRAILER', 'JCB'];
const PayToTransporterEnum = ['OWNER', 'TRANSPORTER'];
const ReportingEnum = ['REPORT1', 'REPORT2', 'REPORT3']; // Example values, replace with actual reporting options
const ModeEnum = ['AIR', 'RAIL', 'ROAD', 'SEA']; // Example values, replace with actual mode options

// Define schema for Vehicle Hire
const vehicleHireSchema = new mongoose.Schema({
    document_type: { type: String, enum: DocumentTypeEnum, required: true },
    type: { type: String, enum: TypeEnum, required: true },
    broker_name: String,
    vehicle_number: { type: String, required: true },
    date: { type: Date, default: Date.now },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    via: String,
    multiple_delivery_point: Boolean,
    manifest_no: String,
    placement_no: String,
    contents: String,
    vehicle: String,
    load_type: { type: String, enum: LoadTypeEnum },
    pay_to_transporter: { type: String, enum: PayToTransporterEnum, required: true },
    state: String,
    pan: String,
    reporting: { type: String, enum: ReportingEnum },
    expected_delivery_date: Date,
    mode: { type: String, enum: ModeEnum },
    placed_by: { type: String, enum: ['BROKER', 'DIRECT'] },
    total: {
        base: Number,
        guaranteed_weight: Number,
        kanta_weight: Number,
        slip_no: String
    },
    vehicle_details: {
        owner: String,
        address: String,
        pan: String,
        mobile: String,
        photo1: String,
        photo2: String
    },
    driver_profile: {
        name: String,
        address: String,
        mobile: String,
        lic_no: String,
        photo1: String,
        photo2: String
    },
    broker_profile: {
        mobile_no: String,
        document_type: String,
        photo1: String
    }
});

module.exports = mongoose.model('VehicleHire', vehicleHireSchema);





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