var Joi = require('@hapi/joi');
var Promotion_Model = require('../../app/Models/Promotions');
var fs = require('fs')
module.exports.promotion_Delete_Api = async function promotion_Delete_Api(req, res) {
    try {
        var params = req.body;
        if (typeof params.promotionID === 'undefined' || params.promotionID.trim() === '') {
            return res.status(400).json({
                result: 0,
                message: "Promotion ID is required"
            })
        }
        //Perform delete operation here
        var PromtionIDFetch = await Promotion_Model.findOne({ promotionID: params.promotionID }).exec();
        if (!PromtionIDFetch) {
            return res.status(400).json({
                result: 0,
                message: "Promotion ID not valid"
            })
        }
        var deleteResult = await Promotion_Model.deleteOne({ promotionID: params.promotionID }).exec();
        if (deleteResult.deletedCount > 0) {
            if (PromtionIDFetch.offerType == "buygetoffer") {
                fs.unlink('./public' + PromtionIDFetch.advertisementImage, (err) => {
                    if (err) {
                        console.log("Promotion image file unlink failure")
                    } else {
                        console.log("Promotion image file unlink success")
                    }
                })
                return res.json({
                    result: 3,
                    message: "Promotion deleted successfully"
                })
            } else {
                return res.json({
                    result: 3,
                    message: "Promotion deleted successfully"
                })
            }
        } else {
            return res.json({
                result: 0,
                message: "Promotion deletion failed or Promotion ID not found"
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