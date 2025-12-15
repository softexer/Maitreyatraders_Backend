var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whishlist = new schema({
    whishlistID:{
     type:String,
     required:true,
     unique:true,
     index:true
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    ProductID: {
        type: String,
        required: true,
    },
    ProductName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default:""
    },
    timeStamp: {
        type: String,
        required: true,
    },
    countViews: {
        type: Number,
        required: false,
        default: 0
    },
    image:{
        type: String,
        required:false,
    }
})
module.exports = mongoose.model('whishlist', whishlist);