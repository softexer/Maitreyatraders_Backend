var Joi = require('@hapi/joi');
var Customer_Model = require('../../app/Models/customer');
var Orders_Model = require('../../app/Models/orders')
module.exports.Customer_Orders_Fetch = async function Customer_Orders_Fetch(req, res) {
    try {
        var params = req.body;
        var CustomerOrdersFetch_Validate = Joi.object({
            userID: Joi.string().strict().required(),
            orderID: Joi.string().strict().required()
        })
        var result = await CustomerOrdersFetch_Validate.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        if (params.orderID == "All") {
            var OrderDataFetch = await Orders_Model.find({ contactData: params.userID }).exec();
            if (OrderDataFetch) {
                return res.json({ response: 3, message: "Orders Data Fetch Successfully", OrderData: OrderDataFetch })
            }
        } else {
            var OrderDataFetch = await Orders_Model.find({ contactData: params.userID, orderId: params.orderID }).exec();
            if (OrderDataFetch) {
                return res.json({ response: 3, message: "Orders Data Fetch Successfully", OrderData: OrderDataFetch })
            }
        }


    } catch (error) {
        console.log(error.message)
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}