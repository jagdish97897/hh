const mongoose = require('mongoose');

// Define ENUMs
const DocumentTypeEnum = ['CONSIGNMENT AUTO', 'CN LOCAL MOVEMENT', 'CONSIGNMENT NOTE'];
const TypeEnum = ['DOMESTIC', 'CARGO', 'CUSTOMS CLEARING SERVICES', 'DANGEROUS CARGO', 'DOCUMENT', 'DOCUMENT DAY DEFINITE DELIVERY', 'DOMISTIC AIRFREIGHT', 'DOMESTIC BOX', 'DOMESTIC DOCUMENT BY AIR', 'DOMESTIC PARCEL BY EXPRESS', 'DOMESTIC PARCEL BY TRAIN', 'DOMESTIC PARCEL BY TRUCK', 'ECO', 'E-COMMERCE', 'EXPRESS IMPORT', 'FTL', 'GLOBAL MAILING SERVICES', 'HGMV', 'INDUSTRIAL PROJECT TRANSPORTATION', 'INTERCONTINENTAL DIRECT', 'INTERNATIONAL', 'INTERNATIONAL BOX', 'INTERNATIONAL DOCUMENT EXPRESS', 'INTERNATIONAL OCEAN FREIGHT', 'INTERNATIONAL PARCEL', 'INTERNATIONAL PARCELS EXPRESS', 'OTHER', 'OWN', 'PARCEL', 'PO', 'SAARC SURFACE', 'SO', 'TEMPERATURE CONTROLLED CARGO', 'TRADE FAIRES AND EVENTS', 'TRADE FAIRS AND EVENTS'];
const AgainstEnum = ['DIRECT', 'ORDER', 'PLACEMENT', 'RC PO NO'];
const PaymentTermEnum = ['TO BB', 'CASH', 'FOC', 'TO PAY'];
const ModeEnum = ['ROAD', 'AIR', 'BY HAND', 'CARGO', 'EXPRESS', 'MULTI MODEL', 'TRAIN'];
const DeliveryAtEnum = ['DIRECT', 'DOOR', 'DOOR TO DOOR', 'DOOR TO TERMINAL', 'GODOWN', 'LOCAL DELIVERY', 'TERMINAL TO DOOR', 'TERMINAL TO TERMINAL'];

// Define schema for Goods Receipt
const goodsReceiptSchema = new mongoose.Schema({
    document_type: { type: String, enum: DocumentTypeEnum, required: true },
    type: { type: String, enum: TypeEnum, required: true },
    against: { type: String, enum: AgainstEnum, required: true },
    date: { type: Date, default: Date.now },
    consignment_no: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    via: String,
    container_no: String,
    seal_no: String,
    route: String,
    distance: Number,
    vehicle: String,
    payment_term: { type: String, enum: PaymentTermEnum },
    mode: { type: String, enum: ModeEnum },
    at: String,
    consignor: {
        name: String,
        location: String,
        gstin: String
    },
    consignee: {
        name: String,
        location: String,
        gstin: String
    },
    billing_party: {
        name: String,
        location: String,
        gstin: String
    },
    delivery_at: { type: String, enum: DeliveryAtEnum },
    delivery_address: String
});

module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);
