var Category = require('../../app/Models/Categories');
var DailyDeals = require('../../app/Models/todaydeals');
var productsdbQuaries = {
    insertsellerproductparamsData: (params, projectid, date, filedbpath) => {
        console.log(params)
        var insertProducts = new DailyDeals({
            ProductID: projectid,
            subCategoryid: params.subCategoryID,
            Categoryid: params.CategoryID,
            ProductName: params.ProductName,
            Brand: params.Brand,
            MRP_Price: params.MRP_Price,
            VMART_Price: params.VMART_Price,
            quantity: params.quantity,
            description: params.description,
            postDate: date,
            ProductImage: filedbpath,
            Netweight:params.Netweight


        })
        return insertProducts;
    },
    checkingcategoryIDandSubcategoryID: (params) => {
        return Category.findOne({ categoryID: params.CategoryID, "subCategorys.subCategoryID": params.subCategoryID }).exec();
    },
    fetchProductIDdataparams: (params) => {
        return DailyDeals.findOne({ ProductID: params.ProductID }).exec();
    },
    updateproductsdataparams: (params, filedbpath) => {
        var date = new Date().getTime();
        return DailyDeals.updateOne({ ProductID: params.ProductID },
            {
                $set: {
                    url: params.url,
                    ProductName: params.ProductName,
                    Brand: params.Brand,
                    MRP_Price: params.MRP_Price,
                    VMART_Price: params.VMART_Price,
                    Netweight:params.Netweight,
                    quantity: params.quantity,
                    description: params.description,
                    ProductImage: filedbpath,
                    postDate:date
                }
            }
        )
    },
    productsdatafetchparamstype: (params) => {
        if (params.type === "All") {
            return DailyDeals.find({}).exec();
        } else {
            return DailyDeals.find({ $or: [{ ProductID: params.type }, { Categoryid: params.tpe }, { subCategoryid: params.type }, { Brand: params.type }] })
        }
    },
    fetchproductsdata: (params) => {
        if (params.type === "All") {
            return DailyDeals.find({}).exec();
        } else {
            return DailyDeals.find({ $or: [{ ProductID: params.type }, { subCategoryid: params.type }, { Categoryid: params.type }] })
        }
    },
    deleteproductsdataparams:(params)=>{
        if (params.type === "All") {
            return DailyDeals.deleteMany({}).exec();
        } else {
            return DailyDeals.deleteMany({ $or: [{ ProductID: params.type }, { subCategoryid: params.type }, { Categoryid: params.type }] })
        }
    }

}
module.exports = productsdbQuaries;
