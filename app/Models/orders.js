const { type } = require('@hapi/joi/lib/extend');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var orderdata = new schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    PhoneNumber: {
        type: String,
        required: false,
    },
    Products: {
        type: Array,
        required: false,
        default: []
    },
    carttotal: {
        type: Number,
        required: false
    },
    deliverycharges: {
        type: Number,
        required: false
    },
    deliverytype: {
        type: String,
        required: false
    },
    timestamp: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    pin: {
        type: String,
        required: false
    },
    deliverydate: {
        type: String,
        required: false
    },
    deliverystatus: {
        type: String,
        required: false
    },
    orderstatus: {
        type: String,
        required: false
    },
    paymentstatus: {
        type: String,
        required: false
    },
    reason_for_cancel: {
        type: String,
        required: false,
        default: "InProcess"
    },
})
module.exports = mongoose.model('ordersdata', orderdata)