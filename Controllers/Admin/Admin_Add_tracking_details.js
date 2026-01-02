var Joi = require('@hapi/joi');
var Orders_Model = require('../../app/Models/orders');
var Admin_Model = require('../../app/Models/Admin');
var Products_Model = require('../../app/Models/Products_Schema')

module.exports.Admin_Add_Tracking_Details_Api = async function Admin_Add_Tracking_Details_Api(req, res) {
    try {
        var params = req.body;
        var Validateparams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            orderId: Joi.string().strict().required(),
            orderTrackingDetails: Joi.object({
                courierServiceName: Joi.string().strict().required(),
                shippingDate: Joi.string().strict().required(),
                trackingID: Joi.string().strict().required(),
            }).required(),
        })
        var result = await Validateparams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({
                response: 0, message: result.error.details[0].message
            })
        }
        var checking_AdminuserID = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (checking_AdminuserID) {
            var checking_orderID = await Orders_Model.findOne({ orderId: params.orderId }).exec();
            if (checking_orderID) {
                var UpdateOrderData = await Orders_Model.updateOne({ orderId: params.orderId }, {
                    $set: {
                        orderTrackingDetails: params.orderTrackingDetails,
                        orderStatus: "Shipped"
                    }
                })
                if (UpdateOrderData.modifiedCount > 0) {
                    return res.json({ response: 3, message: "Order tracking details added success" })
                } else {
                    return res.json({ response: 0, message: "Order tracking details added failure" })
                }

            } else {
                return res.json({ response: 0, message: "OrderID data not found" })
            }
        } else {
            return res.json({ response: 0, message: "Admin uniqueID data not found" })
        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Service Error" })
    }
}

module.exports.Admin_Mark_As_Delivered_Api = async function Admin_Mark_As_Delivered_Api(req, res) {
    try {
        var params = req.body;
        var Validateparams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            orderId: Joi.string().strict().required(),
        })
        var result = await Validateparams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({
                response: 0, message: result.error.details[0].message
            })
        }
        var checking_AdminuserID = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (checking_AdminuserID) {
            var checking_orderID = await Orders_Model.findOne({ orderId: params.orderId }).exec();
            if (checking_orderID) {
                var UpdateOrderData = await Orders_Model.updateOne({ orderId: params.orderId }, {
                    $set: {
                        orderStatus: "Delivered"
                    }
                })
                if (UpdateOrderData.modifiedCount > 0) {
                    return res.json({ response: 3, message: "Order status updated successfully" })
                } else {
                    return res.json({ response: 0, message: "Order status updated failure" })
                }

            } else {
                return res.json({ response: 0, message: "OrderID data not found" })
            }
        } else {
            return res.json({ response: 0, message: "Admin uniqueID data not found" })
        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Service Error" })
    }
}

module.exports.Admin_Product_Search_Api = async function Admin_Product_Search_Api(req, res) {
    try {
        var params = req.query;
        console.log(params)
        var Validateparams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            searchText: Joi.string().strict().required(),
        })
        var result = await Validateparams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({
                response: 0, message: result.error.details[0].message
            })
        }
        var checking_AdminuserID = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (checking_AdminuserID) {
            var ProductsSearch = await Products_Model.find({ productName: { $regex: params.searchText, $options: "i" } }, { _id: 0, __v: 0 });
            if (ProductsSearch.length > 0) {
                return res.json({
                    response: 3,
                    message: "Search Products fetch successfully",
                    SearchProducts: ProductsSearch
                })
            } else {
                return res.json({ response: 0, message: "Data not found" })
            }
        } else {
            return res.json({ response: 0, message: "Admin uniqueID data not found" })
        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Service Error" })
    }
}

