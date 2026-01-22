var Joi = require('@hapi/joi');
var Category_Model = require('../../app/Models/Categories');
var Products_Model = require('../../app/Models/Products_Schema')
module.exports.Customer_Products_List = async function Customer_Products_List(req, res) {
    try {
        var params = req.body;
        var Product_Validation = Joi.object({
            subCategoryID: Joi.string().strict().required(),
            productID: Joi.string().strict().required(),

        })
        var result = await Product_Validation.validate(params);
        if (result.error) {
            return res.status(400).json({ response: 0, message: result.error.details[0].message })
        }
        var GettingProducts;
        if (params.productID == "All") {
            GettingProducts = await Products_Model.find({ subCategoryID: params.subCategoryID },
                { _id: 0, __v: 0 }
            ).exec()
        } else {
            GettingProducts = await Products_Model.find({
                subCategoryID: params.subCategoryID,
                productID: params.productID
            }
                , { _id: 0, __v: 0 }
            ).exec()
        }
        if (GettingProducts.length > 0) {
            return res.json({
                response: 3, message: "Products data fetch successfully",
                ProductDetails: GettingProducts
            })
        } else {
            return res.json({ response: 0, message: "Products data not found" })
        }
    } catch (error) {
        return res.status(500).json({
            result: 0,
            message: "Internal Server Error",
            errorDetails: error.message
        })
    }
}

module.exports.singleproduct = async function singleproduct(req, res) {
    try {
        var params = req.body;
        var singleproductFetchValidation = Joi.object({
            categoryID: Joi.string().strict().required(),
            productID: Joi.string().strict().required(),
        })
        var result = await singleproductFetchValidation.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var checkingProductID_GetData = await Products_Model.findOne({
            productID: params.productID,
            categoryID: params.categoryID
        })
        if (checkingProductID_GetData) {
            return res.json({
                response: 3,
                message: "Product data fetch successfully",
                ProductData: checkingProductID_GetData
            })
        } else {
            return res.json({
                response: 0,
                message: "CategoryID/ProductID data not found"
            })
        }

    } catch {
        return res.json({
            response: 0,
            message: "Internal Server Error"
        })
    }
}