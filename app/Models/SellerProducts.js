var mongoose = require('mongoose');
var schema = mongoose.Schema;
var sellerProducts = schema({
    ProductID:{
        type:String,
        required:true,
        unique:true
    },
    subCategoryid:{
        type:String,
        required:false
    },
    Categoryid:{
        type:String,
        required:false
    },
    ProductName:{
        type:String,
        required:false
    },
    Brand:{
        type:String,
        required:false
    },
    MRP_Price:{
        type:Number,
        required:false
    },
    VMART_Price:{
        type:Number,
        required:false
    },
    stockquantity:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    postDate:{
        type:String,
        required:false
    },
    Product_Status:{
        type:Boolean,
        required:false,
        default:true
    },
    ProductImage:{
        type:String,
        required:false
    },
    Netweight:{
        type:String,
        required:false
    },
    customerQuantity:{
        type:String,
        required:false,
        default:'0'
    }
    
})

module.exports =mongoose.model('sellerproducts', sellerProducts);