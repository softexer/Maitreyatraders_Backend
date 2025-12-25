var Joi = require('@hapi/joi');
var Category_Model = require('../../app/Models/Categories');
var Products_Model = require('../../app/Models/Products_Schema')
module.exports.Fetch_Product_Api = async function Fetch_Product_Api(req, res) {
    try {
        var params = req.body;
        var Product_Validation = Joi.object({
            categoryID: Joi.string().strict().required(),
            subCategoryID: Joi.string().strict().required(),
            productID: Joi.string().strict().required(),
            pageNo: Joi.number().integer().strict().required(),
            size: Joi.number().integer().strict().required(),
            searchText: Joi.string().strict().required().allow("")
        })
        var result = await Product_Validation.validate(params);
        if (result.error) {
            return res.status(400).json({ response: 0, message: result.error.details[0].message })
        }
        var GettingProducts;
        var GettingProductsCount = 0;
        if (params.subCategoryID == "All") {
            GettingProductsCount = await Products_Model.countDocuments({ categoryID: params.categoryID });
            GettingProducts = await Products_Model.find({ categoryID: params.categoryID }, { _id: 0, __v: 0 })
                .skip((params.page - 1) * params.size).limit(params.size)
        } else {
            if (params.productID == "All") {
                if (params.searchText.length > 0) {
                    GettingProducts = await Products_Model.find({
                        productName: { $regex: params.searchText, $options: "i" },
                        categoryID: params.categoryID,
                        subCategoryID: params.subCategoryID,
                    }, { _id: 0, __v: 0 }).skip((params.page - 1) * params.size).limit(params.size)
                } else {
                    GettingProducts = await Products_Model.find({
                        categoryID: params.categoryID,
                        subCategoryID: params.subCategoryID,
                    }, { _id: 0, __v: 0 }).skip((params.page - 1) * params.size).limit(params.size)
                }

            } else {
                GettingProducts = await Products_Model.find({
                    categoryID: params.categoryID,
                    subCategoryID: params.subCategoryID,
                    productID: params.productID
                }, { _id: 0, __v: 0 })
            }
        }
        if (GettingProducts.length > 0) {
            var pages = Math.ceil(GettingProductsCount / params.size)
            return res.json({
                response: 3,
                message: "Products data fetch successfully",
                TotalPages: pages,
                CurrentPage: params.pageNo,
                Products: GettingProducts
            })
        } else {
            return res.json({
                response: 0,
                message: "No product data"
            })
        }

    } catch (error) {
        return res.status(500).json({
            result: 0,
            message: "Internal Server Error",
            errorDetails: error.message
        })
    }
}