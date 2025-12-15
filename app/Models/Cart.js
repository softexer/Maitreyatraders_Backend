var mongoose = require('mongoose');
var schema = mongoose.Schema;
var cart = new schema({
    cartId: {
        type: String,
        require: true,
        unique:true,
        index:true
    },
    ProductID: {
        type: String,
        require: true
    },
    PhoneNumber: {
        type: String,
        require: true
    },
    itemName: {
        type: String,
        require: true
    },
    mrpPrice: {
        type: String,
        require: true
    },
    vmartPrice: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },
    netWeight: {
        type: String,
        require: true
    },
    timeStamp: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    shippingPrice: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model("cartData", cart)
