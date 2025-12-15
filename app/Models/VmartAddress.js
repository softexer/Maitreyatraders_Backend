var mongoose = require('mongoose');
var schema = mongoose.Schema;
var vmartAddress = new schema({
    addressId: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    langitude: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("vmartaddress", vmartAddress)