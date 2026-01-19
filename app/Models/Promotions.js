var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Promotion_Schema = new schema({
    promotionID: {
        type: String,
        required: false,
        unique: true,
        index: true
    },
    offerType: {
        type: String,
        required: false,
        default: ""
    },
    buyQunatity: {
        type: Number,
        required: false,
        default: 0
    },
    getQuantity: {
        type: Number,
        required: false,
        default: 0
    },
    advertisementImage: {
        type: String,
        required: false,
        default: ""
    },
    discountAmountPercentage: {
        type: String,
        required: false,
        default: ""
    },
    enterCoupanCode: {
        type: String,
        required: false,
        default: ""
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    },
    status: {
        type: String,
        required: false,
        default: "Active"
    },
    applicableOn: {
        type: String,
        required: false,
        default: ""
    },
    applicableIds: {
        type: Array,
        required: false,
        default: []
    },
    selectFreeProductName: {
        type: String,
        required: false,
        default: ""
    },
    selectFreeProductID: {
        type: String,
        required: false,
        default: ""
    },
    
    timeStamp: {
        type: String,
        required: false,
        default: ""
    }

})
module.exports = mongoose.model("promotion", Promotion_Schema)