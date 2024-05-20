const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freightRateSchema = new Schema({
    contractNo: { type: String, required: true },
    date: { type: Date, required: true },
    template: { type: String, required: true },
    base: { type: String, required: true },
    customer: { type: String, required: true },
    poNo: { type: String, required: true },
    poDate: { type: Date, required: true },
    consignor: { type: String, required: true },
    consignee: { type: String, required: true },
    billingBranch: { type: String, required: true },
    applyOn: { type: Date, required: true },
    dateOn: { type: Date, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    serviceType: { type: String, required: true },
    serviceMode: { type: String, required: true },
    loadType: { type: String, required: true },
    pkgsType: { type: String, required: true },
    contentGroup: { type: String, required: true },
    content: { type: String, required: true },
    calculationBase: { type: String, required: true },
    fillingStation: { type: String, required: true },
    baseFuelRate: { type: Number, required: true },
    varianceFactor: { type: Number, required: true },
    vehicleAge: { type: Number, required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active', // Optional: Set default value to 'active' 28 fields
      required: true
    }
});

module.exports = mongoose.model('Freight', freightRateSchema);
