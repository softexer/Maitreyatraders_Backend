var Category = require('../../app/Models/Categories');
var catId = require('../Core/cartID');
var Dashboard = require('../../app/Models/DashboardData');
var Dailydeals = require('../../app/Models/todaydeals');
var orders = require('../../app/Models/orders');
var SellerProducts = require('../../app/Models/SellerProducts');
var CartData = require('../../app/Models/Cart')
var categorydb = {
    Categoryproductinsertparams: (params, dbpath) => {
        var date = new Date().getTime();
        var ctID = catId.cartID(6);
        var categoryIDGenerate = "CID" + ctID + "@" + date;
        var insertct = new Category({
            categoryName: params.categoryName,
            categoryID: categoryIDGenerate,
            CategoryImage: dbpath
        })
        return insertct;
    },
    subCategoryproductinsertparams: (params, checkingsub) => {

        var date = new Date().getTime();
        var ctID = catId.cartID(6);
        var subctID = catId.cartID(7);
        var categoryIDGenerate = "CID" + ctID + "@" + date;
        var subcategoryIDGenerate = "subCID" + subctID + "@" + date;
        var paths = {
            subCategoryID: subcategoryIDGenerate,
            subCategoryName: checkingsub,
            SubCategoryProfilePic: subdbpath
        }
        var subinsertct = new Category({
            categoryName: params.categoryName,
            categoryID: categoryIDGenerate,
            CategoryImage: dbpath,
            subCategorys: paths

        })
        return subinsertct;
    },
    findCategoryNamechecking: (params) => {
        return Category.findOne({ categoryName: params.categoryName }).exec();
    },
    datacategoryIDfetchparams: (params) => {
        return Category.findOne({ categoryID: params.categoryID }).exec();
    },
    categoryimageupdateparams: (params, dbpathupdate) => {
        return Category.updateOne({ categoryID: params.categoryID }, { $set: { CategoryImage: dbpathupdate } })
    },
    updatedimagesandsubimagesdata: (params, ) => {
        return Category.updateOne({ categoryID: params.categoryID, "subCategorys.$.subCategoryID": params.subCategoryID },
            { $set: { CategoryImage: dbpath, "subCategorys.$.SubCategoryProfilePic": subdbpath } })
    },
    categoryinpushsubCategorydataparams: (params, subcategoryIDGenerate, ) => {
        return Category.updateOne({ categoryID: params.categoryID },
            { $push: { subCategorys: { subCategoryID: subcategoryIDGenerate, subCategoryName: params.subCategoryName } } })
    },
    categoryandsubcategorydatafetchparams: (params) => {
        return Category.findOne(
            { categoryID: params.categoryID, "subCategorys.subCategoryID": params.subCategoryID,
                
                
             },
            { _id: 0, subCategorys: { $elemMatch: { subCategoryID: params.subCategoryID } } });
    },
    updateinsubcategorydataparams: (params) => {
        return Category.updateOne({ "subCategorys.subCategoryID": params.subCategoryID },
            { $set: { "subCategorys.$.subCategoryName": params.subCategoryName } })
    },
    updatesubimageandnameparams: (params, subimagedbpath) => {
        return Category.updateOne({ "subCategorys.subCategoryID": params.subCategoryID },
            { $set: { "subCategorys.$.subCategoryName": params.subCategoryName, "subCategorys.$.SubCategoryProfilePic": subimagedbpath } })
    },
    fetchallcategoriesdataparams: (params) => {
        if (params.type === "All") {
            return Category.find({}, { _id: 0, __v: 0 }).exec();
        } else {
            return Category.find({ categoryID: params.type }, { _id: 0, __v: 0 }).exec();
        }
    },
    pulldatasubcategoryparams: (params) => {
        return Category.updateOne({ "subCategorys.subCategoryID": params.subCategoryID },
            { $pull: { subCategorys: { subCategoryID: params.subCategoryID } } })
    },
    fetchdatasubcategoryIDparams: (params) => {
        return Category.findOne({ "subCategorys.subCategoryID": params.subCategoryID },
            { _id: 0, subCategorys: { $elemMatch: { subCategoryID: params.subCategoryID } } })
    },
    fetchallcategoriesdataparams2: (params) => {
        if (params.type === "All") {
            return Category.find({}).exec();
        } else {
            return Category.find({ categoryID: params.type }).exec();
        }
    },
    deleteallcategoriesdataparams: (params) => {
        if (params.type === "All") {
            return Category.deleteMany({}).exec();
        } else {
            return Category.deleteOne({ categoryID: params.type }).exec();
        }
    },
    datafetchalldashBoardparams: (params) => {
        return Dashboard.find({}, { _id: 0, __v: 0 }).exec();
    },
    dailyproductsfetchdataparams: (params) => {
        var moment = require('moment')
        var stDate = moment().subtract(0, "days").startOf("day");
        var startDate = new Date(stDate).getTime().toString();
        var eDate = moment().subtract(0, "days").endOf("day");
        var endDate = new Date(eDate).getTime().toString();
        console.log(startDate);
        console.log(endDate)
        return Dailydeals.find({ postDate: { $gte: startDate, $lte: endDate } }).exec()
    },
    bestsellesProductsdataparams: (params) => {
        //return orders.find({},{"Products.ProductName":1,"Products.quantity":1,"Products.ProductID":1}).exec();
        return orders.aggregate([{ $unwind: "$Products" },
        { $project: { ProductID: "$Products.ProductID", convertedQty: { $toInt: "$Products.quantity" } } },
        { $group: { _id: "$ProductID", totalquantity: { $sum: "$convertedQty" } } }, { $sort: { totalquantity: -1 } }, { $limit: 10 }
        ])
    },
    minidatafechingparams: (mk) => {
        return SellerProducts.find({ ProductID: { $in: mk } }, { _id: 0, __v: 0 }).exec();
    },
    findcartdata: (params) => {
        return CartData.find({ PhoneNumber: "+91" + params.PhoneNumber }).exec();
    }
}
module.exports = categorydb;