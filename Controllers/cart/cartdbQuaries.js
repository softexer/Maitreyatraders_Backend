var customer = require('../../app/Models/customer');
var CartData = require('../../app/Models/Cart');
var SellerProducts = require('../../app/Models/SellerProducts');
var cart = require('../Core/cartID');
var moment = require('moment')
var cartdbQuaries = {
    customerDatafetch: (params) => {
        return customer.findOne({ PhoneNumber:"+91"+params.mobileNumber })
    },
    checkingcartdataproductID:(params)=>{
        return CartData.findOne({ PhoneNumber:"+91"+params.mobileNumber,ProductID: params.productId})
    },
    updatedaddcartdataparams:(params,fetched)=>{
        var date = new Date().getTime();
        return CartData.updateOne({ PhoneNumber:"+91"+params.mobileNumber,ProductID: params.productId},
            {$set:{
                cartId:fetched.cartId,
                ProductID: params.productId,
                PhoneNumber:"+91"+params.mobileNumber,
                itemName: fetched.itemName,
                mrpPrice: params.mrpPrice,
                vmartPrice: params.vmartPrice,
                quantity: params.quantity,
                netWeight: params.netWeight,
                timeStamp: date,
                url: fetched.url,
                shippingPrice: params.shippingPrice,
            }})
    },
    ProductDatafetchapiparams: (params) => {
        return SellerProducts.findOne({ ProductID: params.productId }).exec();
    },
    cartdatainsertparama: (params, founded) => {
        var id = cart.cartID(5);
        var date = new Date().getTime();
        var dates = moment(date).format('DDMMYYYY');
        var generateID = "CID" + id + '@' + dates;
        var addcart = new CartData({
            cartId: generateID,
            ProductID: params.productId,
            PhoneNumber:"+91"+params.mobileNumber,
            itemName: founded.ProductName,
            mrpPrice: params.mrpPrice,
            vmartPrice: params.vmartPrice,
            quantity: params.quantity,
            netWeight: params.netWeight,
            timeStamp: date,
            url: founded.ProductImage,
            shippingPrice: params.shippingPrice,
        })
        return addcart;
    },
    cartDataChecking: (params) => {
        return CartData.findOne({ cartId:params.cartId})
    },
    cartdataupdatedparams: (params) => {
        return CartData.updateOne(
            { cartId:params.cartId},
         {
                $set: {
                    quantity: params.quantity,
                    netWeight: params.netWeight,
                    mrpPrice: params.mrpPrice,
                    vmartPrice: params.vmartPrice,
                    shippingPrice: params.shippingPrice,
                }
            })
    },
    cartDatadeleteparams: (params) => {
        return CartData.deleteOne({
            cartId:params.cartId,
            PhoneNumber:"+91"+params.mobileNumber
        })
    },
    cartDataFetchesparams: (params) => {
        return CartData.find({ PhoneNumber:"+91"+params.mobileNumber }).exec();
    },
    cartDatadeleteallparams: (params) => {
        return CartData.deleteMany({PhoneNumber:"+91"+params.mobileNumber });
    }

}
module.exports = cartdbQuaries;