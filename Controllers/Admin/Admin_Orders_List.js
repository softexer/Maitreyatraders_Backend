var Joi = require('@hapi/joi');
var Orders_Model = require('../../app/Models/orders');
var Admin_Model = require('../../app/Models/Admin')
module.exports.Admin_Orders_List_Api = async function Admin_Orders_List_Api(req, res) {
    try {
        var params = req.body;
        // console.log(params == "undefined")
        if (params == "undefined" || params == null) {
            return res.json({ response: 0, message: "Please pass input values" })
        }
        // console.log(params)
        var Validate_Admin_Dashboard = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            orderlistType: Joi.string().strict().valid("All", "New", "Shipped", "Delivered").required(),
            sortingType: Joi.string().strict().valid("Ascending", "Descending").required(),
            pageNo: Joi.number().integer().strict().required(),
            size: Joi.number().integer().strict().required(),
        })
        var result = await Validate_Admin_Dashboard.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (Checking_Admin) {
            var Total_Orders = 0;
            var New_Orders = 0;
            var Completed_Orders = 0;
            var Cancel_Orders = 0;
            var OrdersCountAggregateQuery = await Orders_Model.aggregate([{
                $group: {
                    _id: null,
                    Total_Orders_Count: {
                        $sum: 1
                    },
                    New_Orders_Count: {
                        $sum: {
                            $cond: [{ $eq: ["$orderStatus", "New"] }, 1, 0]
                        }
                    },
                    Active_Orders_Count: {
                        $sum: {
                            $cond: [{ $eq: ["$orderStatus", "InProgress"] }, 1, 0]
                        }
                    },
                    Completed_Orders_Count: {
                        $sum: {
                            $cond: [{ $eq: ["$orderStatus", "Completed"] }, 1, 0]
                        }
                    },
                    Cancelled_Orders_Count: {
                        $sum: {
                            $cond: [{ $eq: ["$orderStatus", "Cancelled"] }, 1, 0]
                        }
                    }

                }
            },
            {
                $project: {
                    _id: 0,
                    Total_Orders_Count: 1,
                    New_Orders_Count: 1,
                    Active_Orders_Count: 1,
                    Completed_Orders_Count: 1,
                    Cancelled_Orders_Count: 1
                }
            }
            ])
            var isAscending = false;
            var AscendingorDecendingNumber = -1;
            if (params.sortingType == "Ascending") {
                isAscending = true
                AscendingorDecendingNumber = 1
            } else if (params.sortingType == "Descending") {
                isAscending = false
                AscendingorDecendingNumber = -1
            }
            if (params.orderlistType == "All") {
                var totalordersCount = await Orders_Model.countDocuments({}).exec();
                var totalordersData = await Orders_Model.aggregate([
                    { $sort: { orderTimeStamp: AscendingorDecendingNumber } },
                    { $skip: (params.pageNo - 1) * params.size },
                    { $limit: params.size }
                ])
                if (totalordersData.length > 0) {

                    
                    var totalpages = Math.ceil(totalordersCount / params.size)
                    return res.json({
                        response: 3,
                        message: "Orders list fetch data successfully",
                        currentPage: params.pageNo,
                        totalpages: totalpages,
                        OrdersCount: OrdersCountAggregateQuery,
                        ordersData: totalordersData
                    })
                } else {
                    return res.json({ response: 0, message: "Data not found" })
                }
            } else if (params.orderlistType == "New") {
                var totalordersCount = await Orders_Model.countDocuments({}).exec();
                var totalordersData = await Orders_Model.aggregate([
                    { $match: { orderStatus: { $in: ["New"] } } },
                    { $sort: { orderTimeStamp: AscendingorDecendingNumber } },
                    { $skip: (params.pageNo - 1) * params.size },
                    { $limit: params.size }
                ])
                if (totalordersData.length > 0) {
                    var totalpages = Math.ceil(totalordersCount / params.size)
                    return res.json({
                        response: 3,
                        message: "Orders list fetch data successfully",

                        currentPage: params.pageNo,
                        totalpages: totalpages,
                        OrdersCount: OrdersCountAggregateQuery,
                        ordersData: totalordersData
                    })
                } else {
                    return res.json({ response: 0, message: "Data not found" })
                }
            } else if (params.orderlistType == "Delivered") {
                var totalordersCount = await Orders_Model.countDocuments({}).exec();
                var totalordersData = await Orders_Model.aggregate([
                    { $match: { orderStatus: { $in: ["Delivered"] } } },
                    { $sort: { orderTimeStamp: AscendingorDecendingNumber } },
                    { $skip: (params.pageNo - 1) * params.size },
                    { $limit: params.size }
                ])
                if (totalordersData.length > 0) {
                    var totalpages = Math.ceil(totalordersCount / params.size)
                    return res.json({
                        response: 3,
                        message: "Orders list fetch data successfully",
                        currentPage: params.pageNo,
                        totalpages: totalpages,
                        OrdersCount: OrdersCountAggregateQuery,
                        ordersData: totalordersData
                    })
                } else {
                    return res.json({ response: 0, message: "Data not found" })
                }
            } else if (params.orderlistType == "Shipped") {
                var totalordersCount = await Orders_Model.countDocuments({}).exec();
                var totalordersData = await Orders_Model.aggregate([
                    { $match: { orderStatus: { $in: ["Shipped"] } } },
                    { $sort: { orderTimeStamp: AscendingorDecendingNumber } },
                    { $skip: (params.pageNo - 1) * params.size },
                    { $limit: params.size }
                ])
                if (totalordersData.length > 0) {
                    var totalpages = Math.ceil(totalordersCount / params.size)
                    return res.json({
                        response: 3,
                        message: "Orders list fetch data successfully",
                        currentPage: params.pageNo,
                        totalpages: totalpages,
                        OrdersCount: OrdersCountAggregateQuery,
                        ordersData: totalordersData
                    })
                } else {
                    return res.json({ response: 0, message: "Data not found" })
                }
            }
            // return res.json({
            //     response: 3,
            //     message: "Admin Orders list fetch successfully",
            //     OrdersList: OrdersCountAggregateQuery
            // })

        } else {
            return res.json({ response: 0, message: "Admin userID data not found" })
        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}