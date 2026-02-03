var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Advertisement = new schema({
    advertisementID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    adminuniqueID: {
        type: String,
        required: false,
        default: ""
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    timestamp: {
        type: String,
        required: false,
        default: ""
    }
})
module.exports = mongoose.model("advertisement",Advertisement)