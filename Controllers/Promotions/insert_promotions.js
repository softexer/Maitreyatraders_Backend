var Joi = require('@hapi/joi');
var Promotion_Model = require('../../app/Models/Promotions');
var Admin_Model = require('../../app/Models/Admin');
// var Products_Model = require('../../app/Models/Products_Schema');
// var Category_Model = require('../../app/Models/Categories');

module.exports.promotion_Insert_Api = async function promotion_Insert_Api(req, res) {
    try {

        var params = JSON.parse(req.body.PromotionData);
        console.log("Params:", params);
        var ValidateParams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            offerType: Joi.string().strict().valid("buygetoffer", "discountoffer").required(),
            buyQunatity: Joi.number().integer().strict().optional().allow(0),
            getQuantity: Joi.number().integer().strict().optional().allow(0),
            // categoryID: Joi.string().strict().optional().allow(""),
            // categoryName: Joi.string().strict().optional().allow(""),
            // productID: Joi.string().strict().optional().allow(""),
            // productName: Joi.string().strict().optional().allow(""),
            discountAmountPercentage: Joi.string().strict().optional().allow(""),
            enterCoupanCode: Joi.string().strict().optional().allow(""),
            // selectCategoryApplicableOffer: Joi.string().strict().optional().allow(""),
            // subCategoryID: Joi.string().strict().optional().allow(""),
            // selectSubCategory: Joi.string().strict().optional().allow(""),
            applicableOn: Joi.string().strict().valid("CATEGORY", "SUBCATEGORY", "PRODUCT").required(), // CATEGORY | SUBCATEGORY | PRODUCT
            applicableIds: Joi.array().items(Joi.string()).required(),

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
        if (params.offerType == "buygetoffer") {
            if (req.files != null) {
                var promotionImage = req.files.promotionImage;
                var date = new Date().getTime();
                var filepath = "./public/images/Promotions/" + "Pid@" + date + "_" + promotionImage.name;
                var dbpath = "/images/Promotions/" + "Pid@" + date + "_" + promotionImage.name;
                console.log("promotionImage", promotionImage, "and", filepath);
                promotionImage.mv(filepath, async (err) => {
                    if (err) {
                        return res.json({ response: 0, message: "Promotion image upload failed" })
                    } else {
                        var addPromtionData = await Promotion_Model.insertMany([{
                            promotionID: "PROMO@" + Date.now(),
                            buyQunatity: params.buyQunatity,
                            getQuantity: params.getQuantity,
                            // categoryID: params.categoryID,
                            // categoryName: params.categoryName,
                            // productID: params.productID,
                            // productName: params.productName,
                            offerType: params.offerType,
                            advertisementImage: dbpath,
                            applicableOn: params.applicableOn, // CATEGORY | SUBCATEGORY | PRODUCT
                            applicableIds: params.applicableIds,
                            timeStamp: Date.now()

                        }])
                        if (addPromtionData.length > 0) {
                            return res.json({ response: 3, message: "Promotion added successfully" })
                        } else {
                            return res.json({ response: 0, message: "Promotion added failure" })
                        }
                    }
                })

            } else {
                return res.json({ response: 0, message: "Promotion image required" })
            }

        } else if (params.offerType == "discountoffer") {
            var addPromtionData = await Promotion_Model.insertMany([{
                promotionID: "PROMO@" + Date.now(),
                discountAmountPercentage: params.discountAmountPercentage,
                enterCoupanCode: params.enterCoupanCode,
                //selectCategoryApplicableOffer: params.selectCategoryApplicableOffer,
                // categoryID: params.categoryID,
                // categoryName: params.categoryName,
                // selectSubCategory: params.selectSubCategory,
                // subCategoryID: params.subCategoryID,
                offerType: params.offerType,
                applicableOn: params.applicableOn, // CATEGORY | SUBCATEGORY | PRODUCT
                applicableIds: params.applicableIds,
                timeStamp: Date.now()

            }])
            if (addPromtionData.length > 0) {
                return res.json({ response: 3, message: "Promotion added successfully" })
            } else {
                return res.json({ response: 0, message: "Promotion added failure" })
            }
        } else {
            return res.json({ response: 0, message: "Offer type not valid" })
        }


    } catch (error) {
        console.log("Promotion Insert API Error:", error);
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}