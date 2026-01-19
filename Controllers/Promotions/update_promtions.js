var Joi = require('@hapi/joi');
var Promotion_Model = require('../../app/Models/Promotions');
var Admin_Model = require('../../app/Models/Admin');
var Products_Model = require('../../app/Models/Products_Schema');
var Category_Model = require('../../app/Models/Categories');
var fs = require('fs');

module.exports.promotion_Update_Api = async function promotion_Update_Api(req, res) {

    try {
        var params = JSON.parse(req.body.PromotionData);
        var ValidateParams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            promotionID: Joi.string().strict().required(),
            offerType: Joi.string().strict().valid("buygetoffer", "discountoffer").required(),
            buyQunatity: Joi.number().integer().strict().optional().allow(0),
            getQuantity: Joi.number().integer().strict().optional().allow(0),
            selectFreeProductName: Joi.string().strict().optional().allow(""),
            selectFreeProductID: Joi.string().strict().optional().allow(""),
           
            discountAmountPercentage: Joi.string().strict().optional().allow(""),
            enterCoupanCode: Joi.string().strict().optional().allow(""),
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
        var PromotionIDChecking = await Promotion_Model.findOne({ promotionID: params.promotionID }).exec();
        if (!PromotionIDChecking) {
            return res.json({ response: 0, message: "Promotion ID not valid" })
        }

        if (params.offerType == "buygetoffer") {
            if (req.files != null) {
                var promotionImage = req.files.promotionImage;
                var date = new Date();
                var filepath = "./public/images/Promotions/" + "Pid@" + date + "_" + promotionImage.name;
                var dbpath = "/images/Promotions/" + "Pid@" + date + "_" + promotionImage.name;
                promotionImage.mv(filepath, async (err) => {
                    if (err) {
                        return res.json({ response: 0, message: "Promotion image upload failed" })
                    } else {
                        var addPromtionData = await Promotion_Model.updateOne({ promotionID: params.promotionID }, {
                            $set: {
                                buyQunatity: params.buyQunatity,
                                getQuantity: params.getQuantity,
                                selectFreeProductName: params.selectFreeProductName,
                                selectFreeProductID: params.selectFreeProductID,
                                // categoryID: params.categoryID,
                                // categoryName: params.categoryName,
                                // productID: params.productID,
                                // productName: params.productName,
                                offerType: params.offerType,
                                applicableOn: params.applicableOn, // CATEGORY | SUBCATEGORY | PRODUCT
                                applicableIds: params.applicableIds,
                                advertisementImage: dbpath,
                                timeStamp: Date.now()
                            }

                        })
                        if (addPromtionData.modifiedCount > 0) {
                            fs.unlinkSync("./public" + PromotionIDChecking.advertisementImage, (err) => {
                                if (err) {
                                    console.log("Promotion old image not deleted", err)
                                } else {
                                    console.log("Promotion old image deleted successfully")
                                }
                            })
                            return res.json({ response: 3, message: "Promotion updated successfully" })
                        } else {
                            return res.json({ response: 0, message: "Promotion updated failure" })
                        }
                    }
                })

            } else {
                var updatepromotionData = await Promotion_Model.updateOne(
                    { promotionID: params.promotionID }, {
                    $set: {
                        buyQunatity: params.buyQunatity,
                        getQuantity: params.getQuantity,
                        applicableOn: params.applicableOn, // CATEGORY | SUBCATEGORY | PRODUCT
                        applicableIds: params.applicableIds,
                        // categoryID: params.categoryID,
                        // categoryName: params.categoryName,
                        // productID: params.productID,
                        // productName: params.productName,
                        offerType: params.offerType,
                        timeStamp: Date.now()
                    }
                }).exec();
                if (updatepromotionData.modifiedCount > 0) {
                    return res.json({ response: 3, message: "Promotion updated successfully" })
                } else {
                    return res.json({ response: 0, message: "Promotion updated failure" })
                }
            }

        } else if (params.offerType == "discountoffer") {
            var addPromtionData = await Promotion_Model.updateOne({ promotionID: params.promotionID }, {
                $set: {
                    discountAmountPercentage: params.discountAmountPercentage,
                    enterCoupanCode: params.enterCoupanCode,
                    // selectCategoryApplicableOffer: params.selectCategoryApplicableOffer,
                    // categoryID: params.categoryID,
                    // categoryName: params.categoryName,
                    // selectSubCategory: params.selectSubCategory,
                    // subCategoryID: params.subCategoryID,
                    offerType: params.offerType,
                    timeStamp: Date.now()

                }
            })
            if (addPromtionData.modifiedCount > 0) {
                return res.json({ response: 3, message: "Promotion updated successfully" })
            } else {
                return res.json({ response: 0, message: "Promotion updated failure" })
            }
        } else {
            return res.json({ response: 0, message: "Offer type not valid" })
        }


    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}