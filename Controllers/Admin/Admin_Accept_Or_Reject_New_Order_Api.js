var Joi = require('@hapi/joi');
var Orders_Model = require('../../app/Models/orders');
var Admin_Model = require('../../app/Models/Admin');

module.exports.Admin_Accept_Or_Reject_New_Order_Api = async function Admin_Accept_Or_Reject_New_Order_Api(req, res) {
    try {
        var params = req.body;
        var AcceptOrRejectValidate = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            orderId: Joi.string().strict().required(),
            actionType: Joi.string().strict().valid("Accept", "Reject").required(),
        })

        var result = await AcceptOrRejectValidate.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (Checking_Admin) {
            var Checking_OrderID = await Orders_Model.findOne({ orderId: params.orderId });
            if (Checking_OrderID) {
                if (params.actionType == "Accept") {
                    if (Checking_OrderID.orderStatus === "New") {
                        var UpdateOrderStatus = await Orders_Model.updateOne({ orderId: params.orderId }, {
                            $set: {
                                orderStatus: "InProgress",
                                inprogressTimestamp: new Date().getTime().toString()
                            }
                        })
                        if (UpdateOrderStatus.modifiedCount > 0) {
                            //Order_Accept_Send_Mail_TO_Customer()
                            return res.json({ response: 3, message: "Order accepted successfully" })
                        } else {
                            return res.json({ response: 0, message: "Order acceptance failed" })
                        }
                    } else {
                        return res.json({ response: 0, message: "Only New orders can be accepted" })
                    }
                } else if (params.actionType == "Reject") {
                    if (Checking_OrderID.orderStatus === "New") {
                        var UpdateOrderStatus = await Orders_Model.updateOne({ orderId: params.orderId }, {
                            $set: {
                                orderStatus: "Rejected",
                                rejectedTimestamp: new Date().getTime().toString()
                            }
                        })
                        if (UpdateOrderStatus.modifiedCount > 0) {
                           // Order_Reject_Send_Mail_TO_Customer()
                            return res.json({ response: 3, message: "Order rejected successfully" })
                        } else {
                            return res.json({ response: 0, message: "Order rejection failed" })
                        }
                    } else {
                        return res.json({ response: 0, message: "Only New orders can be rejected" })
                    }
                }
            } else {
                return res.json({ response: 0, message: "Order ID not found" })
            }
        } else {
            return res.json({ response: 0, message: "Admin not found" })
        }
    } catch (error) {
        console.log("error", error.message)
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}