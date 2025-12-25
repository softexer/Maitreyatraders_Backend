var Joi = require('@hapi/joi');
var Category_Model = require('../../app/Models/Categories');
var Products_Model = require('../../app/Models/Products_Schema')
module.exports.Customer_Fetch_Categories_Api = async function Customer_Fetch_Categories_Api(req, res) {
    try {
        var gettingCategories = await Category_Model.find({},{_id:0,__v:0}).exec();
        if (gettingCategories) {
            return res.json({
                response: 3,
                message: "Categories data fetch successfully",
                CategoriesData: gettingCategories
            })

        } else {
            return res.json({ response: 0, message: "Category Data not found" })
        }
    } catch (error) {
        return res.status(500).json({
            result: 0,
            message: "Internal Server Error",
            errorDetails: error.message
        })
    }
}