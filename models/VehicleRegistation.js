const mongoose = require('mongoose');
const { Schema } = mongoose;
const SupplyChainPartner = require('./SupplyChainPartner'); // Ensure the path is correct

const vehicleRegistrationSchema = new Schema({
    vehicleNo: { type: String, required: true },
    segmentCategory: String,
    businessGroup: String,
    oldRegistration: String,
    loadType: String,
    controllingBranch: String,
    registrationDate: { type: Date, required: true },
    manufacturingYear: Number,
    supervisor: String,
    vehicleType: String,
    trolleyNo: String,
    ownership: String,
    through: { type: String, enum: ['DIRECT', 'BROKER'], required: true },
    make: String,
    model: String,
    owner: { type: String, required: true }, // Store the owner's name directly
    broker: { type: String, required: true }, // Store the broker's name directly
    currentRoute: String,
    rtoType: String,
    validUpto: { type: Date, required: true },
    rtoAuthority: String,
    permitType: { type: String, enum: ['STATE', 'NATIONAL', 'INTERNATIONAL'], required: true },
    validState: String,
    currentODM: String,
    oldODM: String,
    serviceType: String,
    expireDate: Date,
    currentStatus: String,
    currentStation: String,
    ownerPhone: String, // Field to store owner's phone number
    ownerAddress:String,
    brokerPhone: String, // Field to store broker's phone number
    brokerAddress:String
});

// Middleware to verify owner and broker names exist in SupplyChainPartner collection
vehicleRegistrationSchema.pre('save', async function (next) {
    try {
        const owner = await SupplyChainPartner.findOne({ name: this.owner, type: 'Owner' });
        const broker = await SupplyChainPartner.findOne({ name: this.broker, type: 'Broker' });

        if (!owner) {
            return next(new Error('Owner not found in SupplyChainPartner collection'));
        }
        if (!broker) {
            return next(new Error('Broker not found in SupplyChainPartner collection'));
        }


        // Set the owner's and broker's phone numbers
        this.ownerPhone = owner.phone;
        this.ownerAddress = owner.address;
        this.brokerPhone = broker.phone;
        this.brokerAddress = broker.address;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('VehicleRegistration', vehicleRegistrationSchema);
