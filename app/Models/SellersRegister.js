const mongoose = require('mongoose');
let schema = mongoose.Schema;

var SellerData = new schema({
    Name: {
        type: String,
        required: false
    },
    userID: {
        type: String,
        unique: true,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: false,
        unique: true
    },
    BankName: {
        type: String,
        required: false
    },
    AccountNumber: {
        type: String,
        required: false
    },
    IFSCCode: {
        type: String,
        required: false
    },
    AccountName: {
        type: String,
        required: false
    },
    RegisterDate: {
        type: String,
        required: false
    },
    Otp: {
        type: String,
        required: false
    },
    merchantID: {
        type: String,
        required: false,
        unique: true
    },
    Password:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('sellerData', SellerData);