var SellerProducts = require('../../app/Models/SellerProducts');
var whishlist = require('../../app/Models/whishlist');
var id = require('../Core/cartID');
var moment = require('moment')
var dbQuarieswhishlist = {
    fetchproductdataparams: (params) => {
        return SellerProducts.findOne({ ProductID: params.ProductID })
    },
    checkingdatawhishlistdbparams: (params) => {
        return whishlist.findOne({ PhoneNumber:"+91"+params.PhoneNumber, ProductID: params.ProductID })
    },
    updatedcountviews: (params, countviews) => {
        return whishlist.updateOne({ PhoneNumber:"+91"+params.PhoneNumber, ProductID: params.ProductID },
            { $set: { countViews: countviews } })
    },
    insertedwhishlistdata: (params, found) => {
        var ids = id.cartID(6);
        var date = moment().format('DDMMYYYY')
        var idgenerate = "WLI" + ids + '@' + date;
        var dates = new Date().getTime();
        var insertwishlistdata = new whishlist({
            whishlistID: idgenerate,
            PhoneNumber:"+91"+params.PhoneNumber,
            ProductID: params.ProductID,
            ProductName: found.ProductName,
            timeStamp: dates,
            image: found.ProductImage,
            countViews: 1

        })
        return insertwishlistdata;

    },
    whishlistfetchdata: (params) => {
        return whishlist.find({ PhoneNumber:"+91"+params.PhoneNumber }).exec();
    },
    whishlistdeletedata: (params) => {
        return whishlist.deleteOne({ PhoneNumber:"+91"+params.PhoneNumber, ProductID: params.ProductID })
    }

}
module.exports = dbQuarieswhishlist;