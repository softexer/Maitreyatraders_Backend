const mongoose = require('mongoose');
const db = require('./DBConnection');
let schema = mongoose.Schema;

var CustomerSchema = new schema({
    firstName:
    {
        type: String,
        required: false,
    },
    lastName:
    {
        type: String,
        required: false
    },
    userID: {
        type: String,
        required: false,
        default:""
    },
    PhoneNumber: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    Password:
    {
        type: String,
        required: false
    },
    Otp:
    {
        type: String,
        required: false,
    },
    merchantId:{
        type: String,
        required: false
    },
    CartID:{
        type: String,
        required: false
    },
    RegisterDate:{
        type: String,
        required: false
    },
    loginStatus:{
        type: Boolean,
        required: false,
        default:false
    }
    
    
});
db.connectToDB();

module.exports = mongoose.model('Customers', CustomerSchema);