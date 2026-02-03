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
    categoryID: {
        type: String,
        required: false,
        default: ""
    },
    subCategoryID: {
        type: String,
        required: false,
        default: ""
    },
    productID: {
        type: String,
        required: false,
        default: ""
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    description: {
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
module.exports = mongoose.model("advertisement", Advertisement)