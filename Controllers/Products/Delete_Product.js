var Joi = require('@hapi/joi');
var Category_Model = require('../../app/Models/Categories');
var Products_Model = require('../../app/Models/Products_Schema')
var fs = require('fs')
module.exports.Delete_Product_Api = async function Delete_Product_Api(req, res) {
    try {
        var params = req.body;
        var Product_Validation = Joi.object({
            categoryID: Joi.string().strict().required(),
            subCategoryID: Joi.string().strict().required(),
            productID: Joi.string().strict().required(),

        })
        var result = await Product_Validation.validate(params);
        if (result.error) {
            return res.status(400).json({ response: 0, message: result.error.details[0].message })
        }

        var GettingProducts = await Products_Model.find({
            categoryID: params.categoryID,
            subCategoryID: params.subCategoryID,
            productID: params.productID
        }, { _id: 0, __v: 0 })
        if (GettingProducts.length > 0) {
            var DeleteProduct = await Products_Model.deleteOne({
                categoryID: params.categoryID,
                subCategoryID: params.subCategoryID,
                productID: params.productID
            }, { _id: 0, __v: 0 });
            console.log("DeleteProduct", DeleteProduct)
            if (DeleteProduct.deletedCount > 0) {
                var productimages = GettingProducts[0].productImagesList
                for (var count = 0; count < productimages.length; count++) {
                    if (productimages[count]) {
                        fs.unlink('./public' + productimages[count], (err) => {
                            if (err) {
                                console.log("image file unlink failure")
                            } else {
                                console.log("image file unlink success")
                            }
                        })
                    }
                }
                return res.json({ response: 3, message: "Product deleted successfully completed" })
            } else {
                return res.json({ response: 0, message: "Product deleted failure" })
            }
        } else {
            return res.json({ response: 0, message: "ProductID data not found" })
        }

    } catch (error) {
        return res.status(500).json({
            result: 0,
            message: "Internal Server Error",
            errorDetails: error.message
        })
    }
}