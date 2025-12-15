var Category = require('../../app/Models/Categories');
var sellerProduct = require('../../app/Models/SellerProducts');
var cartData = require('../../app/Models/Cart')
var productsdbQuaries = {
    insertsellerproductparamsData: (params, projectid, date, filedbpath) => {
        console.log(params)
        var insertProducts = new sellerProduct({
            ProductID: projectid,
            subCategoryid: params.subCategoryID,
            Categoryid: params.CategoryID,
            ProductName: params.ProductName,
            Brand: params.Brand,
            MRP_Price: params.MRP_Price,
            VMART_Price: params.VMART_Price,
            stockquantity: params.quantity,
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
        return sellerProduct.findOne({ ProductID: params.ProductID }).exec();
    },
    updateproductsdataparams: (params, filedbpath) => {
        return sellerProduct.updateOne({ ProductID: params.ProductID },
            {
                $set: {
                    ProductName: params.ProductName,
                    Brand: params.Brand,
                    MRP_Price: params.MRP_Price,
                    VMART_Price: params.VMART_Price,
                    Netweight:params.Netweight,
                    stockquantity: params.quantity,
                    description: params.description,
                    ProductImage: filedbpath,
                    Product_Status:params.Product_Status
                }
            }
        )
    },
    productsdatafetchparamstype: (params) => {
        if (params.type === "All") {
            return sellerProduct.find({},{_di:0,__v:0}).exec();
        } else {
            return sellerProduct.find({ $or: [{ ProductID: params.type }, { Categoryid: params.type }, { subCategoryid: params.type }, { Brand: params.type }] },{_di:0,__v:0})
        }
    },
    fetchproductsdata: (params) => {
        if (params.type === "All") {
            return sellerProduct.find({}).exec();
        } else {
            return sellerProduct.find({ $or: [{ ProductID: params.type }, { subCategoryid: params.type }, { Categoryid: params.type }] })
        }
    },
    deleteproductsdataparams:(params)=>{
        if (params.type === "All") {
            return sellerProduct.deleteMany({}).exec();
        } else {
            return sellerProduct.deleteMany({ $or: [{ ProductID: params.type }, { subCategoryid: params.type }, { Categoryid: params.type }] })
        }
    },
    customerfetchcartIDdata:(params)=>{
        return cartData.find({PhoneNumber:"+91"+params.PhoneNumber}).exec();
    },
    productssearchfetchData:(params)=>{
        return sellerProduct.find({$text: { $search: '"' + params.type + '"' }})
        // return sellerProduct.find({ProductName:{$regex:"/^"+params.type+"/"}})
    }
}
module.exports = productsdbQuaries;
