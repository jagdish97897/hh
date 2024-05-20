const mongoose = require('mongoose');

const podSchema = new mongoose.Schema({
    consignmentNo: { type: String, required: true },
    receivingDate: { type: Date, required: true },
    voucherNo: { type: String, required: true },
    consignmentType: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    consignee: { type: String, required: true },
    consignor: { type: String, required: true },
    consignmentDate: { type: Date, required: true },
    loadingDate: { type: Date, required: true },
    reportingDate: { type: Date, required: true },
    unloadingDate: { type: Date, required: true },
    weight: { type: String, required: true },
    pkgs: { type: String, required: true },
    through: { type: String, enum: ['ORIGINAL', 'WHATSAPP', 'EMAIL', 'MOBILE APP'], required: true },
    status: { type: String, enum: ['OK', 'DAMAGE', 'EXCESS', 'SHORT'], required: true },
    reportNo: { type: String, required: true },
    reportSubmitDate: { type: Date, required: true },
    receiver: { 
        name: { type: String, required: true },
        relation: { type: String, required: true },
        mobNo: { type: String, required: true },
        phoneNo: { type: String, required: true },
        email: { type: String, required: true }
    }
});

module.exports = mongoose.model('Pod', podSchema);
