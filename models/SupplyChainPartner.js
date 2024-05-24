

const mongoose = require('mongoose');

const supplyChainPartnerSchema = new mongoose.Schema({
    type: { type: String, enum: ['Owner', 'Broker','Driver'], required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    country: String,
    state: String,
    city: String,
    PIN: String,
    phone: String,
    PAN: String,
    email: String,
    photo:String,
    remark:String,
});

module.exports = mongoose.model('supplyChainPartner', supplyChainPartnerSchema);
