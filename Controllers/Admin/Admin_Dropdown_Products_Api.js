var Products_Model = require('../../app/Models/Products_Schema');
var Joi = require('@hapi/joi');
module.exports.Admin_Dropdown_Products_Api = async function Admin_Dropdown_Products_Api(req, res) {
    try {
        var params = req.body;
        var ValidateParams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            type: Joi.string().strict().valid("category", "subcategory", "product").required(),
            selectTypeID: Joi.string().strict().required().allow("")
        })
        var result = await ValidateParams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var DropdownData = [];
        if (params.type == "category") {
            DropdownData = await Products_Model.find({ categoryID: params.selectTypeID }, {
                _id: 0,  productID: 1, productName: 1
            });
        } else if (params.type == "subcategory") {
            DropdownData = await Products_Model.find({ subCategoryID: params.selectTypeID },
                { _id: 0, productID: 1, productName: 1 })
        } else if (params.type == "product") {
            DropdownData = await Products_Model.find({ productID: params.selectTypeID },
                { _id: 0, productID: 1, productName: 1 });
        }
        if (DropdownData.length > 0) {
            return res.json({
                response: 3,
                message: "Dropdown products data fetch successfully",
                dropdownProductsData: DropdownData
            })
        } else {
            return res.json({
                response: 0,
                message: "Dropdown products data not found"
            })
        }

    } catch (error) {
        console.log("Error in Admin_Dropdown_Products_Api:", error);
        return res.status(500).json({
            response: 0,
            message: "Internal Server Error",
            errorDetails: error.message
        })
    }
}