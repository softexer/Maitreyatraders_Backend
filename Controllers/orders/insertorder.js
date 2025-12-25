var Joi = require('@hapi/joi');
var order_Model = require('../../app/Models/orders');
var Products_Model = require('../../app/Models/Products_Schema')
module.exports.Order_Insert_Api = async function Order_Insert_Api(req, res) {
    try {
        var params = req.body;
        var OrderInsert_Validation = Joi.object({
            // orderId:
            contactData: Joi.string().strict().required(),
            Products: Joi.array().items(Joi.object().keys({
                productID: Joi.string().strict().required(),
                productName: Joi.string().strict().required(),
                categoryID: Joi.string().strict().required(),
                subCategoryID: Joi.string().strict().required(),
                quantity: Joi.number().integer().strict().required(),
                price: Joi.number().integer().strict().required(),
                weight: Joi.string().strict().required(),
                productImagePath: Joi.string().strict().required(),
            }).required()).required(),
            addressDetails: Joi.object({
                country: Joi.string().strict().required(),
                firstName: Joi.string().strict().required(),
                lastName: Joi.string().strict().required(),
                address: Joi.string().strict().required(),
                apartment: Joi.string().strict().required(),
                city: Joi.string().strict().required(),
                state: Joi.string().strict().required(),
                pincode: Joi.string().strict().required(),
            }).required(),
            shippingMethod: Joi.string().strict().required(),
            billingAddressDetails: Joi.object({
                country: Joi.string().strict().required(),
                firstName: Joi.string().strict().required(),
                lastName: Joi.string().strict().required(),
                address: Joi.string().strict().required(),
                apartment: Joi.string().strict().required(),
                city: Joi.string().strict().required(),
                state: Joi.string().strict().required(),
                pincode: Joi.string().strict().required(),
            }).required(),
            coupanCode: Joi.string().strict().required().allow(""),
            coupanAmount: Joi.number().integer().strict().required().allow(0).default(0),
            subTotal: Joi.number().integer().strict().required(),
            deliveryFee: Joi.number().integer().strict().required(),
            totalToPay: Joi.number().integer().strict().required(),
            paymentType: Joi.string().strict().required(),
            paymentData: Joi.object().strict().required(),
        })
        var result = await OrderInsert_Validation.validate(params);
        if (result.error) {
            return res.status(400).json({ response: 0, message: result.error.details[0].message })
        }
        const OIDNumber = Math.floor(100000 + Math.random() * 900000);
        //console.log(otp);

        // var orderID = await order_Model.countDocuments({});
        // var OIDGenerate = 1000 + orderID
        var orderinsert = await order_Model.insertMany([{
            orderId: "#" + OIDNumber + new Date().getFullYear(),
            contactData: params.contactData,
            emailID: params.contactData,
            phoneNumber: params.contactData,
            Products: params.Products,
            addressDetails: params.addressDetails,
            shippingMethod: params.shippingMethod,
            billingAddressDetails: params.billingAddressDetails,
            coupanCode: params.coupanCode,
            coupanAmount: params.coupanAmount,
            subTotal: params.subTotal,
            deliveryFee: params.deliveryFee,
            totalToPay: params.totalToPay,
            paymentType: params.paymentType,
            paymentData: params.paymentData,
            orderStatus: "New",
            paymentStatus: "Completed",
            orderTimeStamp: new Date().getTime().toString()
        }])
        if (orderinsert.length > 0) {
            return res.json({ response: 3, message: "Order booking successfully completed" })
        } else {
            return res.json({ response: 0, message: "Order booking failure" })
        }
    } catch (error) {
        return res.json({
            response: 0,
            message: "Internal Server Error",
            error: error.message
        })
    }
}