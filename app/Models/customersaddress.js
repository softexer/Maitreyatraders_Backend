const mongoose = require('mongoose');
let schema = mongoose.Schema;
var customerAddress = new schema({
    pinCode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    favourite: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    // merchantId: {
    //     type: String,
    //     required: true
    // },
    addressID:{
        type: String,
        required: true,
        unique:true
    },
    isdefault:{
        type:Boolean,
        required:false,
        default:false
    }
})
module.exports = mongoose.model('customersaddress', customerAddress);