var Joi = require('@hapi/joi');
var Admin_Model = require('../../app/Models/Admin');
var Orders_Model = require('../../app/Models/orders');
var Products_Model = require('../../app/Models/Products_Schema')
var moment = require("moment");
const { response } = require('express');
module.exports.Admin_Dash_Board_Api = async function Admin_Dash_Board_Api(req, res) {
    try {
        var params = req.body;
        // console.log(params == "undefined")
        if (params == "undefined" || params == null) {
            return res.json({ response: 0, message: "Please pass input values" })
        }
        // console.log(params)
        var Validate_Admin_Dashboard = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            pageNo: Joi.number().integer().strict().required(),
            size: Joi.number().integer().strict().required(),
            selectTypeGraph: Joi.string().strict().valid("Today", "Week", "Month", "Year").required(),
            startDate: Joi.string().strict().required(),
            endDate: Joi.string().strict().required()
        })
        var result = await Validate_Admin_Dashboard.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (Checking_Admin) {
            var total_order_count = 0;
            var active_order_count = 0;
            var completed_order_count = 0;

            //Total Orders 
            var total_orders = await Orders_Model.countDocuments({}).exec();
            total_order_count = total_orders;
            var active_orders = await Orders_Model.countDocuments({ orderStatus: "InProgress" }).exec();
            active_order_count = active_orders;
            var compvare_orders = await Orders_Model.countDocuments({ orderStatus: "Compvared" })
            completed_order_count = compvare_orders;
            //Compare Previous month and Current Month
            var TotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""

            }

            //Active Orders
            var ActiveTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""

            }
            //Compared Orders
            var ComparedTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""

            }
            var currentMonthStart = moment().startOf("month").valueOf();
            var currentMonthEnd = moment().endOf("month").valueOf();

            var previousMonthStart = moment().subtract(1, "month").startOf("month").valueOf();
            var previousMonthEnd = moment().subtract(1, "month").endOf("month").valueOf();
            console.log(previousMonthStart)
            const currentMonth = moment().format("YYYY-MM");
            const previousMonth = moment().subtract(1, "month").format("YYYY-MM");

            //Total Orders Previous Month Compare
            var monthCompareDataTotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                        orderTimeStamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$orderTimeStamp" }
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $dateToString: { format: "%Y-%m", date: "$orderDate" }
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]);

            var TotalOrderscurrentCount = 0;
            var TotalOrderspreviousCount = 0;

            monthCompareDataTotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    TotalOrderspreviousCount = item.count;
                }
            });
            var TotalOrderspercentageChange = 0;
            var trend = "no_change";

            if (TotalOrderspreviousCount === 0 && TotalOrderscurrentCount > 0) {
                TotalOrderspercentageChange = 100;
                trend = "increase";
            } else if (TotalOrderspreviousCount > 0) {
                TotalOrderspercentageChange = ((TotalOrderscurrentCount - TotalOrderspreviousCount) / TotalOrderspreviousCount) * 100;
                trend = TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            TotalOrderspercentageChange = Number(TotalOrderspercentageChange.toFixed(2));
            console.log("fggg", TotalOrderspercentageChange)
            TotalOrdersComparePreviousMonth.currentMonthOrders = TotalOrderscurrentCount;
            TotalOrdersComparePreviousMonth.previousMonthOrders = TotalOrderspreviousCount;
            TotalOrdersComparePreviousMonth.percentageChange = TotalOrderspercentageChange;
            TotalOrdersComparePreviousMonth.trend = trend

            //Active Orders Compare Percentage
            var Active_monthCompareDataTotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                        orderTimeStamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$orderTimeStamp" }
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $dateToString: { format: "%Y-%m", date: "$orderDate" }
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]);

            var Active_TotalOrderscurrentCount = 0;
            var Active_TotalOrderspreviousCount = 0;

            Active_monthCompareDataTotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Active_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Active_TotalOrderspreviousCount = item.count;
                }
            });
            var Active_TotalOrderspercentageChange = 0;
            var Active_trend = "no_change";

            if (Active_TotalOrderspreviousCount === 0 && Active_TotalOrderscurrentCount > 0) {
                Active_TotalOrderspercentageChange = 100;
                Active_trend = "increase";
            } else if (Active_TotalOrderspreviousCount > 0) {
                Active_TotalOrderspercentageChange = ((Active_TotalOrderscurrentCount - Active_TotalOrderspreviousCount) / Active_TotalOrderspreviousCount) * 100;
                Active_trend = Active_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Active_TotalOrderspercentageChange = Number(TotalOrderspercentageChange.toFixed(2));
            console.log("Active_TotalOrderspercentageChange", Active_TotalOrderspercentageChange)
            ActiveTotalOrdersComparePreviousMonth.currentMonthOrders = Active_TotalOrderscurrentCount;
            ActiveTotalOrdersComparePreviousMonth.previousMonthOrders = Active_TotalOrderspreviousCount;
            ActiveTotalOrdersComparePreviousMonth.percentageChange = Active_TotalOrderspercentageChange;
            ActiveTotalOrdersComparePreviousMonth.trend = Active_trend


            //Completed Orders Compare Percentage
            var Completed_monthCompareDataTotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                        orderTimeStamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$orderTimeStamp" }
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $dateToString: { format: "%Y-%m", date: "$orderDate" }
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]);

            var Completed_TotalOrderscurrentCount = 0;
            var Completed_TotalOrderspreviousCount = 0;

            Completed_monthCompareDataTotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Completed_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Completed_TotalOrderspreviousCount = item.count;
                }
            });
            var Completed_TotalOrderspercentageChange = 0;
            var Completed_trend = "no_change";

            if (Completed_TotalOrderspreviousCount === 0 && Completed_TotalOrderscurrentCount > 0) {
                Completed_TotalOrderspercentageChange = 100;
                Completed_trend = "increase";
            } else if (Completed_TotalOrderspreviousCount > 0) {
                Completed_TotalOrderspercentageChange = ((Completed_TotalOrderscurrentCount - Completed_TotalOrderspreviousCount) / Completed_TotalOrderspreviousCount) * 100;
                Completed_trend = Completed_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Completed_TotalOrderspercentageChange = Number(Completed_TotalOrderspercentageChange.toFixed(2));
            console.log("Completed_TotalOrderspercentageChange", Completed_TotalOrderspercentageChange)
            ComparedTotalOrdersComparePreviousMonth.currentMonthOrders = Completed_TotalOrderscurrentCount;
            ComparedTotalOrdersComparePreviousMonth.previousMonthOrders = Completed_TotalOrderspreviousCount;
            ComparedTotalOrdersComparePreviousMonth.percentageChange = Completed_TotalOrderspercentageChange;
            ComparedTotalOrdersComparePreviousMonth.trend = Completed_trend

            //New Orders Fetch
            var Recent_Orders_Fetch = await Orders_Model.find({ orderStatus: "New" });
            //Best Seller Product
            var Get_best_sellers_Products = await Orders_Model.aggregate([{
                $match: {
                    orderStatus: { $in: ["New", "InProgress", "Compvared"] }
                }
            },
            { $unwind: "$Products" },
            {
                $group: {
                    _id: "$Products.productID",
                    count: { $sum: 1 },
                }
            },
            { $sort: { count: -1 } }, { $limit: 10 }
            ])
            //  console.log("Get_best_sellers_Products", Get_best_sellers_Products);
            var productIDS = [];
            //Store ProductIDs All 
            if (Get_best_sellers_Products.length > 0) {
                for (var count = 0; count < Get_best_sellers_Products.length; count++) {
                    if (Get_best_sellers_Products[count]) {
                        productIDS.push(Get_best_sellers_Products[count]._id)
                    }
                }
            }
            //Prodcuts seller top
            var ProductsTopSelles = [];
            var Product_Best_Sellers = await Products_Model.find({ productID: { $in: productIDS } }, { _id: 0, __v: 0 }).exec();
            if (Product_Best_Sellers.length > 0) {
                ProductsTopSelles = Product_Best_Sellers
            }
            //Graph Implement
            var GraphData = [];
            if (params.selectTypeGraph == "Today") {
                // var GettingOrderGraphData = await Orders_Model.find({
                //     orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                //     orderTimeStamp: { $gte: params.startDate, $lte: params.endDate }
                // })
                // var startDate = Number(params.startDate);
                // var endDate = Number(params.endDate);

                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: {
                                $in: [
                                    "New",
                                    "InProgress",
                                    "Compvared"
                                ]
                            },
                            orderTimeStamp: {
                                $gte: params.startDate,
                                $lte: params.endDate
                            }
                        }
                    },
                    {
                        $addFields: {
                            orderDate: { $toDate: { $toLong: "$orderTimeStamp" } }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: {
                                        format: "%Y-%m-%d",
                                        date: "$orderDate"
                                    }
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            date: "$_id.date",
                            count: 1
                        }
                    },
                    { $sort: { date: 1 } }
                ]);
                if(GettingOrderGraphData.length==0){

                    var dateStr = moment(parseInt(params.startDate)).format("YYYY-MM-DD");
                    GettingOrderGraphData.push({
                        date: dateStr,
                        count:0
                    })
                }

                
                return res.json({
                    response: 3,
                    message: "Admin home page fetch data successfully",
                    TotalOrders: total_order_count,
                    ActiveOrders: active_order_count,
                    CompvaredOrders: completed_order_count,
                    TotalOrdersPercentage: TotalOrdersComparePreviousMonth,
                    TotalOrdersActivePercentage: ActiveTotalOrdersComparePreviousMonth,
                    TotalOrdersCompletedPercentage: ComparedTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: GettingOrderGraphData,
                    NewOrders: Recent_Orders_Fetch
                })

            } else if (params.selectTypeGraph == "Week") {
                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                            orderTimeStamp: {
                                $gte: params.startDate,
                                $lte: params.endDate
                            }
                        }
                    },
                    {
                        $addFields: {
                            orderDate: {
                                $toDate: { $toLong: "$orderTimeStamp" }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$orderDate" }
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            date: "$_id.date",
                            count: 1
                        }
                    },
                    {
                        $sort: { date: 1 }
                    }
                ]);


                var start = moment(parseInt(params.startDate));
                var end = moment(parseInt(params.endDate));

                var dateMap = {};
                GettingOrderGraphData.forEach(item => {
                    dateMap[item.date] = item.count;
                });

                var finalGraphData = [];

                while (start.isSameOrBefore(end)) {
                    var dateStr = start.format("YYYY-MM-DD");

                    finalGraphData.push({
                        date: dateStr,
                        count: dateMap[dateStr] || 0   // 👈 default 0
                    });

                    start.add(1, "day");
                }
                return res.json({
                    response: 3,
                    message: "Admin home page fetch data successfully",
                    TotalOrders: total_order_count,
                    ActiveOrders: active_order_count,
                    CompvaredOrders: completed_order_count,
                    TotalOrdersPercentage: TotalOrdersComparePreviousMonth,
                    TotalOrdersActivePercentage: ActiveTotalOrdersComparePreviousMonth,
                    TotalOrdersCompletedPercentage: ComparedTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: finalGraphData,
                    NewOrders: Recent_Orders_Fetch
                })

            } else if (params.selectTypeGraph == "Month") {
                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                            orderTimeStamp: {
                                $gte: params.startDate,
                                $lte: params.endDate
                            }
                        }
                    },
                    {
                        $addFields: {
                            orderDate: {
                                $toDate: { $toLong: "$orderTimeStamp" }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$orderDate" }
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            date: "$_id.date",
                            count: 1
                        }
                    },
                    {
                        $sort: { date: 1 }
                    }
                ]);


                var start = moment(parseInt(params.startDate));
                var end = moment(parseInt(params.endDate));

                var dateMap = {};
                GettingOrderGraphData.forEach(item => {
                    dateMap[item.date] = item.count;
                });

                var finalGraphData = [];

                while (start.isSameOrBefore(end)) {
                    var dateStr = start.format("YYYY-MM-DD");

                    finalGraphData.push({
                        date: dateStr,
                        count: dateMap[dateStr] || 0   // 👈 default 0
                    });

                    start.add(1, "day");
                }
                return res.json({
                    response: 3,
                    message: "Admin home page fetch data successfully",
                    TotalOrders: total_order_count,
                    ActiveOrders: active_order_count,
                    CompvaredOrders: completed_order_count,
                    TotalOrdersPercentage: TotalOrdersComparePreviousMonth,
                    TotalOrdersActivePercentage: ActiveTotalOrdersComparePreviousMonth,
                    TotalOrdersCompletedPercentage: ComparedTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: finalGraphData,
                    NewOrders: Recent_Orders_Fetch
                })
            } else if (params.selectTypeGraph == "Year") {
                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: { $in: ["New", "InProgress", "Compvared"] },
                            orderTimeStamp: {
                                $gte: params.startDate,
                                $lte: params.endDate
                            }
                        }
                    },
                    {
                        $addFields: {
                            orderDate: {
                                $toDate: { $toLong: "$orderTimeStamp" }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                month: {
                                    $dateToString: { format: "%Y-%m", date: "$orderDate" }
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            month: "$_id.month",
                            count: 1
                        }
                    },
                    {
                        $sort: { month: 1 }
                    }
                ]);
                var start = moment(parseInt(params.startDate)).startOf("month");
                var end = moment(parseInt(params.endDate)).endOf("month");

                var monthMap = {};
                GettingOrderGraphData.forEach(item => {
                    monthMap[item.month] = item.count;
                });

                var finalGraphData = [];

                while (start.isSameOrBefore(end)) {
                    var monthStr = start.format("YYYY-MM");

                    finalGraphData.push({
                        month: monthStr,
                        count: monthMap[monthStr] || 0   // 👈 default zero
                    });

                    start.add(1, "month");
                }
                return res.json({
                    response: 3,
                    message: "Admin home page fetch data successfully",
                    TotalOrders: total_order_count,
                    ActiveOrders: active_order_count,
                    CompvaredOrders: completed_order_count,
                    TotalOrdersPercentage: TotalOrdersComparePreviousMonth,
                    TotalOrdersActivePercentage: ActiveTotalOrdersComparePreviousMonth,
                    TotalOrdersCompletedPercentage: ComparedTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: finalGraphData,
                    NewOrders: Recent_Orders_Fetch
                });


            } else {
                return res.json({ response: 0, message: "Please pass correct select type graph" })
            }


        } else {
            return res.json({ response: 0, message: "Admin uniqueID data not found" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}