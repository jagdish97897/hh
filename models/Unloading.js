const mongoose = require('mongoose');

const documentTypeSchema = new mongoose.Schema({
    documentType: { type: String, required: true },
    type: {
        type: String,
        enum: ['DOMESTIC', 'CARGO', 'CUSTOMS CLEARING SERVICES', 'DANGEROUS CARGO', 'DOCUMENT', 'DOCUMENT DAY DEFINITE DELIVERY', 'DOMISTIC AIRFREIGHT', 'DOMESTIC BOX', 'DOMESTIC DOCUMENT BY AIR', 'DOMESTIC PARCEL BY EXPRESS', 'DOMESTIC PARCEL BY TRAIN', 'DOMESTIC PARCEL BY TRUCK', 'ECO', 'E-COMMERCE', 'EXPRESS IMPORT', 'FTL', 'GLOBAL MAILING SERVICES', 'HGMV', 'INDUSTRIAL PROJECT TRANSPORTATION', 'INTERCONTINENTAL DIRECT', 'INTERNATIONAL', 'INTERNATIONAL BOX', 'INTERNATIONAL DOCUMENT EXPRESS', 'INTERNATIONAL OCEAN FREIGHT', 'INTERNATIONAL PARCEL', 'INTERNATIONAL PARCELS EXPRESS', 'OTHER', 'OWN', 'PARCEL', 'PO', 'SAARC SURFACE', 'SO', 'TEMPERATURE CONTROLLED CARGO', 'TRADE FAIRES AND EVENTS', 'TRADE FAIRS AND EVENTS'],
        required: true
    },
    unloadingNo: { type: String, required: true },
    date: { type: Date, required: true },
    vehiclePlacementNo: { type: String, required: true },
    loadType: { type: String },
    loadingFactoryOEMLeftDate: { type: Date },
    againstNum: { type: String, required: true }, // Could be an array if it can have multiple values
    reportingDate: { type: Date },
    uploadedBy: { type: String },
    source: { type: String },
    deliverAt: {
        type: String,
        enum: ['DIRECT', 'DOOR', 'DOOR TO DOOR', 'DOOR TO TERMINAL', 'GODOWN', 'LOCAL DELIVERY', 'TERMINAL TO DOOR', 'TERMINAL TO TERMINAL'],
        required: true
    },
    godown: { type: String },
    rffNo: { type: String },
    refDate: { type: Date },
    transporter: { type: String },
    driver: { type: String },
    vehicleNo: { type: String }
});

module.exports = mongoose.model('DocumentType', documentTypeSchema);
