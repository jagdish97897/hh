const mongoose = require('mongoose');

const billCreateSchema = new mongoose.Schema({
    voucherType: { type: String, required: true },
    type: { type: String, required: true },
    customer: { type: String, required: true },
    billNo: { type: String, required: true },
    date: { type: Date, required: true },
    POS: { type: String, required: true },
    location: { type: String, required: true },
    source: { type: String, required: true },
    against: { type: String, required: true },
    dueDate: { type: Date },
    GSTOnFreight: { type: String, required: true },
    rateOn: { type: String, required: true },
    subject: { type: String, required: true },
    costCenter: { type: String, required: true },
    consignment: { type: String, required: true },

    total: {
        base: { type: String, required: true },
        PKGS: { type: String, required: true },
        weight: { type: String, required: true },
        freight: { type: String, required: true },
        gross: { type: String, required: true },
        gstOnFreight: { type: String, required: true },
        gstOnCharges: { type: String, required: true },
        otherCharges: { type: String, required: true },
        taxable: { type: String, required: true },
        nonTaxable: { type: String, required: true },
        total: { type: String, required: true },
        advanceReceivable: { type: String, required: true },
        IGST: { type: String, required: true },
        CGST: { type: String, required: true },
        CESS: { type: String, required: true },
        TDSAmount: { type: String, required: true },
        net: { type: String, required: true }
    },

    // charge: {
    //     billSunderis: {
    //         statisticalCharges: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         loadingCharges: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         otherCharges: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         loadingDetention: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         odcLength: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         ODCWIDTH: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         ODCHEIGHT: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOUTTARPRADESH: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTORAJASTHAN: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOMAHARASATRA: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         ENVIRONMENTCOMENSATIONCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         MAHARASTRAPERMISSION: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         UNLOADINGCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOGUJARAT: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         WAREHOUSECHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         UNLOADINGDETENTION: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         DETENTIONCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         TWOPOINTUNLOADING: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOODISHA: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         EXTRAWEIGHTCHG: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         TWOPOINTLOADING: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOTRIPURA: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RToBIHAR: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         DISCOUNT: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOCHHATTISGARH: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         VEHICLERETURNCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         TOLLTAX: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         MOBILIZATIONCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         TRANSHIPMENTCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         CRANECHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOKARNATAKA: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         THREEPOINTLOADING: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         DOUBLEDRIVERCHG: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         FASTDELIVERYCHG: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         LABOURCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         SURCHARGE: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         DEMOBILIZATIONCHARGES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         REIMBURSEMENT: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         FIVEPOINTUNLOADING: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         PICKUPFROMBALLABHGARH: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         EXTRACOMPLIANCES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         },
    //         RTOEXPENSES: {
    //             amount: { type: String, required: true },
    //             gst: { type: String, required: true },
    //             total: { type: String, required: true }
    //         }
           
    //     }
    // },

    others: {
        interstate: { type: String , enum:["true","false"] },
        reverseCharges: { type: String , enum:["true","false"] },
        itemCode:  String ,
        description:  String ,
        poJobNo:  String ,
        poJobDate:  Date ,
        wccSbNo:  String ,
        wccSbDate:  Date ,
        siteName:  String ,
        siteID:  String ,
        receiptNo:  String ,
        receiptDate:  Date ,
        SACCode:  String ,
        paymentBank:  String 
    },

    remarks: String 
});

module.exports = mongoose.model('BillCreate', billCreateSchema);