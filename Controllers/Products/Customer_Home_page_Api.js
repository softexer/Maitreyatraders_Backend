
var Joi = require('@hapi/joi');
var Category_Model = require('../../app/Models/Categories');
var Products_Model = require('../../app/Models/Products_Schema');
var Orders_Model = require('../../app/Models/orders')
module.exports.Customer_Home_page_Api = async function Customer_Home_page_Api(req, res) {
    try {
        var Products_Latest_OR_New_Products = await Products_Model.find({}).sort({ timestamp: -1 }).limit(10);
        var BestSalersProductsData = [];
        var bestsales = await Orders_Model.aggregate([{ $unwind: "$Products" },
        {
            $project: {
                productID: "$Products.productID",
                quantity: "$Products.quantity"
            }
        },
        { $group: { _id: "$productID", totalquantity: { $sum: "$quantity" } } },
        { $sort: { totalquantity: -1 } },
        { $limit: 10 }
        ])
        if (bestsales.length > 0) {

            var productIDs = [];
            for (var count = 0; count < bestsales.length; count++) {
                if (bestsales[count]) {
                    productIDs.push(bestsales[count]._id)
                }
            }

            BestSalersProductsData = await Products_Model.find({ productID: { $in: productIDs } },
                { _id: 0, __v: 0 });

        } else {

            BestSalersProductsData = await Products_Model.find({}).limit(10);

        }

        return res.json({
            response: 3,
            message: "Home page data fetch successfully",
            NewProducts: Products_Latest_OR_New_Products,
            BestSalesProductsData: BestSalersProductsData


        })


    } catch (error) {
        return res.status(500).json({
            result: 0,
            message: "Internal Server Error",
            errorDetails: error.message
        })
    }
}