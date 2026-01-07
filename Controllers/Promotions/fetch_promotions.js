var Joi = require('@hapi/joi');
var Promotion_Model = require('../../app/Models/Promotions');
var Admin_Model = require('../../app/Models/Admin');

module.exports.promotion_Fetch_Api = async function promotion_Fetch_Api(req, res) {
    try {
        var params = req.body;
        var ValidateParams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
           // promotionID: Joi.string().strict().optional().allow(""),
            type: Joi.string().strict().valid("buygetoffer", "discountoffer","All","Active","Inactive").required(),
            pageNumber: Joi.number().integer().strict().required(),
            pageSize: Joi.number().integer().strict().required(),
        })
        var result = await ValidateParams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }

        var Checking_adminuniqueID = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();
        if (!Checking_adminuniqueID) {
            return res.json({ response: 0, message: "Admin uniqueID not valid" })
        }
        var filter = {};
        if (params.type !== "All") {
            if (params.type === "Active") {
                filter.isActive = true;
            } else if (params.type === "Inactive") {
                filter.isActive = false;
            } else {
                filter.offerType = params.type;
            }
        }
        var totalCount = await Promotion_Model.countDocuments(filter).exec();
        var promotionsList = await Promotion_Model.find(filter, { _id: 0, __v: 0 })
            .skip((params.pageNumber - 1) * params.pageSize).limit(params.pageSize).exec();
        var totalPages = Math.ceil(totalCount / params.pageSize);
        return res.json({
            response: 3,
            message: "Promotions fetched successfully",
            TotalPages: totalPages,
            CurrentPage: params.pageNumber,
            Promotions: promotionsList
        })

    } catch (error) {
        console.log("Error in fetch promotion api:", error)
        return res.status(500).json({ response: 0, message: "Internal server error" + error.message })
    }
}