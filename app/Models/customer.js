const mongoose = require('mongoose');
const db = require('./DBConnection');
let schema = mongoose.Schema;

var CustomerSchema = new schema({
    firstName:
    {
        type: String,
        required: false,
         default:""
    },
    lastName:
    {
        type: String,
        required: false,
         default:""
    },
    userID: {
        type: String,
        required: false,
        default: ""
    },
    PhoneNumber: {
        type: String,
        required: false,
        default: ""
    },
    Password:
    {
        type: String,
        required: false,
        default: ""
    },
    Otp:
    {
        type: String,
        required: false,
        default: ""
    },
    merchantId: {
        type: String,
        required: false,
        default: ""
    },
    CartID: {
        type: String,
        required: false,
        default: ""
    },
    RegisterDate: {
        type: String,
        required: false,
        default: ""
    },
    loginStatus: {
        type: Boolean,
        required: false,
        default: false
    }


});
db.connectToDB();

module.exports = mongoose.model('Customers', CustomerSchema);