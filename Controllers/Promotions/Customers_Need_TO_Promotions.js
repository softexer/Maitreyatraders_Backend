var Joi = require('@hapi/joi');
var Promotion_Model = require('../../app/Models/Promotions');
var Products_Model = require('../../app/Models/Products_Schema')
module.exports.Customer_Fetch_Promotions_Api = async function Customer_Fetch_Promotions_Api(req, res) {
    try {
        var params = req.query;
        if (params.hasOwnProperty("pageNumber")) {
            params.pageNumber = parseInt(params.pageNumber);
        }
        if (params.hasOwnProperty("pageSize")) {
            params.pageSize = parseInt(params.pageSize);
        }
        console.log(params)
        var Validateparams = Joi.object({
            promotionID: Joi.string().strict().required(),
            pageNumber: Joi.number().integer().strict().required(),
            pageSize: Joi.number().integer().strict().required(),
        })
        var result = await Validateparams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var CheckingPromotionID = await Promotion_Model.findOne({ promotionID: params.promotionID }).exec();
        if (!CheckingPromotionID) {
            return res.json({ response: 0, message: "Promotion ID not valid" })
        }
        if (CheckingPromotionID.applicableOn == "PRODUCT") {
            //Fetch products based on product IDs
            var ProductListCount = await Products_Model.countDocuments({ productID: { $in: CheckingPromotionID.applicableIds } });
            console.log("ProductListCount:", ProductListCount);
            var ProductsList = await Products_Model.find({ productID: { $in: CheckingPromotionID.applicableIds } },
                { _id: 0, __v: 0 }).skip((params.pageNumber - 1) * params.pageSize).limit(params.pageSize);
            var totalpages = Math.ceil(ProductListCount / params.pageSize);
            return res.json({
                response: 3,
                message: "Promotion products fetched successfully",
                totalpages: totalpages,
                productsData: ProductsList
            })
        } else if (CheckingPromotionID.applicableOn == "CATEGORY") {
            //Fetch products based on category
            var ProductListCount = await Products_Model.countDocuments({ categoryID: { $in: CheckingPromotionID.applicableIds } });
            console.log("ProductListCount:", ProductListCount);
            var totalpages = Math.ceil(ProductListCount / params.pageSize);
            var ProductsList = await Products_Model.find({ categoryID: { $in: CheckingPromotionID.applicableIds } },
                { _id: 0, __v: 0 }).skip((params.pageNumber - 1) * params.pageSize).limit(params.pageSize);
            return res.json({
                response: 3,
                message: "Promotion products fetched successfully",
                totalpages: totalpages,
                productsData: ProductsList
            })

        } else if (CheckingPromotionID.applicableOn == "SUBCATEGORY") {
            //Fetch products based on subcategory
            var ProductListCount = await Products_Model.countDocuments({ subCategoryID: { $in: CheckingPromotionID.applicableIds } });
            console.log("ProductListCount:", ProductListCount);
            var totalpages = Math.ceil(ProductListCount / params.pageSize);
            var ProductsList = await Products_Model.find({ subCategoryID: { $in: CheckingPromotionID.applicableIds } },
                { _id: 0, __v: 0 }).skip((params.pageNumber - 1) * params.pageSize).limit(params.pageSize);
            return res.json({
                response: 3,
                message: "Promotion products fetched successfully",
                totalpages: totalpages,
                productsData: ProductsList
            })

        } else {
            return res.json({ response: 0, message: "Promotion applicableOn data not valid" })
        }

    } catch (error) {
        return res.status(500).json({
            response: 0,
            message: "Internal Server Error"
        })
    }
}