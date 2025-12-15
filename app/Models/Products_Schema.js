var mongoose = require('mongoose');
var schema = mongoose.Schema;
var products = schema({
    productID: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: false,
        default: ""
    },
    productDescription: {
        type: String,
        required: false,
        default: ""
    },
    categoryID: {
        type: String,
        required: false,
        default: ""
    },
    categoryName: {
        type: String,
        required: false,
        default: ""
    },
    subCategoryID:{
        type: String,
        required: false,
        default: ""
    },
    subCategoryName: {
        type: String,
        required: false,
        default: ""
    },
    productPrice: {
        type: Number,
        required: false,
        default: 0
    },
    disCountProductprice: {
        type: Number,
        required: false,
        default: 0
    },
    taxIncludedPrice: {
        type: Boolean,
        required: false,
        default: false
    },
    expirationStartDate: {
        type: String,
        required: false,
        default: ""
    },
    expirationEndDate: {
        type: String,
        required: false,
        default: ""
    },
    productImagesList: {
        type: Array,
        required: false,
        default: []
    },
    stockQuantity:{
         type: Number,
        required: false,
        default: 0
    },
    isStockUnlimited:{
        type: Boolean,
        required: false,
        default: false
    },
    stockStatus:{
         type: String,
        required: false,
        default: ""
    },
    isHighlightedProduct:{
        type: Boolean,
        required: false,
        default: false
    },


})

module.exports = mongoose.model('products', products);