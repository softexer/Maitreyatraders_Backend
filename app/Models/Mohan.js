var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mohandata = new Schema({
    uniqueID: {
        type: String,
        required: false,
        default: new Date().getTime().toString()
    },
    userID: {
        type: String,
        required: false,
        default: ""
    },
    age: {
        type: Number,
        required: false,
        default: 21
    },
    prices: {
        type: Array,
        required: false,
        default: [10, 20, 40]
    },
    address: {
        village: {
            type: String,
            required: false,
            default: "Suddapalle"
        },
        mandal: {
            type: String,
            required: false,
            default: "Peddamudiam"
        },
        distric: {
            type: String,
            required: false,
            default: "Y S R"
        },
        postalcode: {
            type: String,
            required: false,
            default: "516434"
        },
        state: {
            type: String,
            required: false,
            default: "Andra Pradesh"
        },
        country: {
            type: String,
            required: false,
            default: "India"
        },
        houseNumber: {
            type: String,
            required: false,
            default: "1/154/23"
        },
    },
    amount: {
        type: Number,
        required: false,
        default: 2000
    },
    products: {
        type: Array,
        required: false,
        default: []
    },
    timestamp:{
        type:Date,
        required:false,
        default:Date.now

    }
})

module.exports = mongoose.model("mohan",mohandata)