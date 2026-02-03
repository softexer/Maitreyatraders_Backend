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
            // order status : New , InProgress, Rejected, Cancelled, Shipped, Delivered
            // these status we use based on conditions

            //All orders Getting
            var total_order_count = 0;
            //New orders getting
            var new_count = 0;
            //Inprogress orders getting
            var Inprogress_count = 0;

            //shipped orders getting

            var shipped_count = 0;

            //Cancelled orders getting
            var cancelled_count = 0;

            //Rejected orders getting
            var reject_count = 0;

            //Delivered orders getting

            var delivered_count = 0;

            // var active_order_count = 0;
            // var completed_order_count = 0;
            // var cancelled_order_count = 0;




            //Total Orders 
            var total_orders = await Orders_Model.countDocuments({}).exec();
            total_order_count = total_orders;

            //New orders
            var active_orders = await Orders_Model.countDocuments({ orderStatus: "New" }).exec();
            new_count = active_orders;

            //Inprogress orders
            var inprogress_orders = await Orders_Model.countDocuments({ orderStatus: "InProgress" }).exec();
            Inprogress_count = inprogress_orders;
            //Shipped orders
            var shipped_orders = await Orders_Model.countDocuments({ orderStatus: "Shipped" }).exec();
            shipped_count = shipped_orders;
            //Cancelled orders
            var cancelled_orders = await Orders_Model.countDocuments({ orderStatus: "Cancelled" }).exec();
            cancelled_count = cancelled_orders;

            //Rejected orders
            var rejected_orders = await Orders_Model.countDocuments({ orderStatus: "Rejected" }).exec();
            reject_count = rejected_orders;

            //Delivered orders
            var completed_orders = await Orders_Model.countDocuments({ orderStatus: "Delivered" }).exec();
            delivered_count = completed_orders;

            //Compare Previous month and Current Month
            var TotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""

            }

            //new Orders
            var NewOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""

            }
            //Inprogress Orders
            var InprogressTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""
            }

            //Shipped Orders
            var ShippedTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""
            }

            //Cancelled orders
            var CancelledTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""
            }

            //Rejected Orders
            var RejectedTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""
            }

            //Delivered Orders
            var DeliveredTotalOrdersComparePreviousMonth = {
                currentMonthOrders: 0,
                previousMonthOrders: 0,
                percentageChange: 0,
                trend: ""
            }



            // //Compared Orders
            // var ComparedTotalOrdersComparePreviousMonth = {
            //     currentMonthOrders: 0,
            //     previousMonthOrders: 0,
            //     percentageChange: 0,
            //     trend: ""

            // }


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
                       // orderStatus: { $in: ["New", "Shipped", "Delivered"] },
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

            //New Orders Compare Percentage
            var Active_monthCompareDataTotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        orderStatus: "New",
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

            Active_TotalOrderspercentageChange = Number(Active_TotalOrderspercentageChange.toFixed(2));
            console.log("Active_TotalOrderspercentageChange", Active_TotalOrderspercentageChange)
            NewOrdersComparePreviousMonth.currentMonthOrders = Active_TotalOrderscurrentCount;
            NewOrdersComparePreviousMonth.previousMonthOrders = Active_TotalOrderspreviousCount;
            NewOrdersComparePreviousMonth.percentageChange = Active_TotalOrderspercentageChange;
            NewOrdersComparePreviousMonth.trend = Active_trend





            //Inprogress Orders Compare Percentage
            var Compared_monthCompareData_Inprogress_TotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        // orderStatus: "InProgress",
                        inprogressTimestamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$inprogressTimestamp" }
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
            var Compared_TotalOrderscurrentCount = 0;
            var Compared_TotalOrderspreviousCount = 0;
            Compared_monthCompareData_Inprogress_TotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Compared_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Compared_TotalOrderspreviousCount = item.count;
                }
            });
            var Compared_TotalOrderspercentageChange = 0;
            var Compared_trend = "no_change";
            if (Compared_TotalOrderspreviousCount === 0 && Compared_TotalOrderscurrentCount > 0) {
                Compared_TotalOrderspercentageChange = 100;
                Compared_trend = "increase";
            } else if (Compared_TotalOrderspreviousCount > 0) {
                Compared_TotalOrderspercentageChange = ((Compared_TotalOrderscurrentCount - Compared_TotalOrderspreviousCount) / Compared_TotalOrderspreviousCount) * 100;
                Compared_trend = Compared_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Compared_TotalOrderspercentageChange = Number(Compared_TotalOrderspercentageChange.toFixed(2));
            console.log("Compared_TotalOrderspercentageChange", Compared_TotalOrderspercentageChange)
            InprogressTotalOrdersComparePreviousMonth.currentMonthOrders = Compared_TotalOrderscurrentCount;
            InprogressTotalOrdersComparePreviousMonth.previousMonthOrders = Compared_TotalOrderspreviousCount;
            InprogressTotalOrdersComparePreviousMonth.percentageChange = Compared_TotalOrderspercentageChange;
            InprogressTotalOrdersComparePreviousMonth.trend = Compared_trend

            //Shipped Orders Compare Percentage
            var Shipped_monthCompareData_Shipped_TotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        // orderStatus: "Shipped",
                        shippedTimestamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$shippedTimestamp" }
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
            var Shipped_TotalOrderscurrentCount = 0;
            var Shipped_TotalOrderspreviousCount = 0;
            Shipped_monthCompareData_Shipped_TotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Shipped_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Shipped_TotalOrderspreviousCount = item.count;
                }
            });
            var Shipped_TotalOrderspercentageChange = 0;
            var Shipped_trend = "no_change";
            if (Shipped_TotalOrderspreviousCount === 0 && Shipped_TotalOrderscurrentCount > 0) {
                Shipped_TotalOrderspercentageChange = 100;
                Shipped_trend = "increase";
            } else if (Shipped_TotalOrderspreviousCount > 0) {
                Shipped_TotalOrderspercentageChange = ((Shipped_TotalOrderscurrentCount - Shipped_TotalOrderspreviousCount) / Shipped_TotalOrderspreviousCount) * 100;
                Shipped_trend = Shipped_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Shipped_TotalOrderspercentageChange = Number(Shipped_TotalOrderspercentageChange.toFixed(2));
            console.log("Shipped_TotalOrderspercentageChange", Shipped_TotalOrderspercentageChange)
            ShippedTotalOrdersComparePreviousMonth.currentMonthOrders = Shipped_TotalOrderscurrentCount;
            ShippedTotalOrdersComparePreviousMonth.previousMonthOrders = Shipped_TotalOrderspreviousCount;
            ShippedTotalOrdersComparePreviousMonth.percentageChange = Shipped_TotalOrderspercentageChange;
            ShippedTotalOrdersComparePreviousMonth.trend = Shipped_trend

            //Cancelled Orders Compare Percentage
            var Cancelled_monthCompareData_Cancelled_TotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        // orderStatus: "Cancelled",
                        cancelledTimestamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$cancelledTimestamp" }
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
            var Cancelled_TotalOrderscurrentCount = 0;
            var Cancelled_TotalOrderspreviousCount = 0;
            Cancelled_monthCompareData_Cancelled_TotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Cancelled_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Cancelled_TotalOrderspreviousCount = item.count;
                }
            });
            var Cancelled_TotalOrderspercentageChange = 0;
            var Cancelled_trend = "no_change";
            if (Cancelled_TotalOrderspreviousCount === 0 && Cancelled_TotalOrderscurrentCount > 0) {
                Cancelled_TotalOrderspercentageChange = 100;
                Cancelled_trend = "increase";
            } else if (Cancelled_TotalOrderspreviousCount > 0) {
                Cancelled_TotalOrderspercentageChange = ((Cancelled_TotalOrderscurrentCount - Cancelled_TotalOrderspreviousCount) / Cancelled_TotalOrderspreviousCount) * 100;
                Cancelled_trend = Cancelled_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Cancelled_TotalOrderspercentageChange = Number(Cancelled_TotalOrderspercentageChange.toFixed(2));
            console.log("Cancelled_TotalOrderspercentageChange", Cancelled_TotalOrderspercentageChange)
            CancelledTotalOrdersComparePreviousMonth.currentMonthOrders = Cancelled_TotalOrderscurrentCount;
            CancelledTotalOrdersComparePreviousMonth.previousMonthOrders = Cancelled_TotalOrderspreviousCount;
            CancelledTotalOrdersComparePreviousMonth.percentageChange = Cancelled_TotalOrderspercentageChange;
            CancelledTotalOrdersComparePreviousMonth.trend = Cancelled_trend

            //Rejected Orders Compare Percentage
            var Rejected_monthCompareData_Rejected_TotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        // orderStatus: "Rejected",
                        rejectedTimestamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$rejectedTimestamp" }
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
            var Rejected_TotalOrderscurrentCount = 0;
            var Rejected_TotalOrderspreviousCount = 0;
            Rejected_monthCompareData_Rejected_TotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Rejected_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Rejected_TotalOrderspreviousCount = item.count;
                }
            });
            var Rejected_TotalOrderspercentageChange = 0;
            var Rejected_trend = "no_change";
            if (Rejected_TotalOrderspreviousCount === 0 && Rejected_TotalOrderscurrentCount > 0) {
                Rejected_TotalOrderspercentageChange = 100;
                Rejected_trend = "increase";
            } else if (Rejected_TotalOrderspreviousCount > 0) {
                Rejected_TotalOrderspercentageChange = ((Rejected_TotalOrderscurrentCount - Rejected_TotalOrderspreviousCount) / Rejected_TotalOrderspreviousCount) * 100;
                Rejected_trend = Rejected_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Rejected_TotalOrderspercentageChange = Number(Rejected_TotalOrderspercentageChange.toFixed(2));
            console.log("Rejected_TotalOrderspercentageChange", Rejected_TotalOrderspercentageChange)
            RejectedTotalOrdersComparePreviousMonth.currentMonthOrders = Rejected_TotalOrderscurrentCount;
            RejectedTotalOrdersComparePreviousMonth.previousMonthOrders = Rejected_TotalOrderspreviousCount;
            RejectedTotalOrdersComparePreviousMonth.percentageChange = Rejected_TotalOrderspercentageChange;
            RejectedTotalOrdersComparePreviousMonth.trend = Rejected_trend

            //Delivered Orders Compare Percentage
            var Delivered_monthCompareData_Delivered_TotalOrders = await Orders_Model.aggregate([
                {
                    $match: {
                        // orderStatus: "Delivered",
                        deliveredTimestamp: {
                            $gte: previousMonthStart.toString(),
                            $lte: currentMonthEnd.toString()
                        }
                    }
                },
                {
                    $addFields: {
                        orderDate: {
                            $toDate: { $toLong: "$deliveredTimestamp" }
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
            var Delivered_TotalOrderscurrentCount = 0;
            var Delivered_TotalOrderspreviousCount = 0;
            Delivered_monthCompareData_Delivered_TotalOrders.forEach(item => {
                if (item._id.month === currentMonth) {
                    Delivered_TotalOrderscurrentCount = item.count;
                }
                if (item._id.month === previousMonth) {
                    Delivered_TotalOrderspreviousCount = item.count;
                }
            });
            var Delivered_TotalOrderspercentageChange = 0;
            var Delivered_trend = "no_change";
            if (Delivered_TotalOrderspreviousCount === 0 && Delivered_TotalOrderscurrentCount > 0) {
                Delivered_TotalOrderspercentageChange = 100;
                Delivered_trend = "increase";
            } else if (Delivered_TotalOrderspreviousCount > 0) {
                Delivered_TotalOrderspercentageChange = ((Delivered_TotalOrderscurrentCount - Delivered_TotalOrderspreviousCount) / Delivered_TotalOrderspreviousCount) * 100;
                Delivered_trend = Delivered_TotalOrderspercentageChange > 0 ? "increase" : "decrease";
            }

            Delivered_TotalOrderspercentageChange = Number(Delivered_TotalOrderspercentageChange.toFixed(2));
            console.log("Delivered_TotalOrderspercentageChange", Delivered_TotalOrderspercentageChange)
            DeliveredTotalOrdersComparePreviousMonth.currentMonthOrders = Delivered_TotalOrderscurrentCount;
            DeliveredTotalOrdersComparePreviousMonth.previousMonthOrders = Delivered_TotalOrderspreviousCount;
            DeliveredTotalOrdersComparePreviousMonth.percentageChange = Delivered_TotalOrderspercentageChange;
            DeliveredTotalOrdersComparePreviousMonth.trend = Delivered_trend

            //New Orders Fetch
            var Recent_Orders_Fetch = await Orders_Model.find({ orderStatus: "New" });
            //Best Seller Product
            var Get_best_sellers_Products = await Orders_Model.aggregate([{
                $match: {
                    orderStatus: { $in: ["Delivered"] }
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
            var ProductIDSAndSalesCounts = []
            //Store ProductIDs All 
            if (Get_best_sellers_Products.length > 0) {
                for (var count = 0; count < Get_best_sellers_Products.length; count++) {
                    if (Get_best_sellers_Products[count]) {
                        productIDS.push(Get_best_sellers_Products[count]._id);
                        var object = {
                            productID: Get_best_sellers_Products[count]._id,
                            salesCount: Get_best_sellers_Products[count].count
                        }
                        ProductIDSAndSalesCounts.push(object);
                    }
                }
            }
            //Prodcuts seller top
            var ProductsTopSelles = [];
            var Product_Best_Sellers = await Products_Model.find({ productID: { $in: productIDS } },
                { _id: 0, __v: 0 }).exec();
            if (Product_Best_Sellers.length > 0) {
                for (var count = 0; count < Product_Best_Sellers.length; count++) {
                    if (Product_Best_Sellers[count]) {
                        //Match and add sales count
                        for (var j = 0; j < ProductIDSAndSalesCounts.length; j++) {
                            if (Product_Best_Sellers[count].productID == ProductIDSAndSalesCounts[j].productID) {

                                Product_Best_Sellers[count]["salesCount"] = ProductIDSAndSalesCounts[j].salesCount;
                                // console.log("Matched ProductID",Product_Best_Sellers[count]);
                            }
                            //ProductsTopSelles.push(Product_Best_Sellers[count]);
                        }

                    }
                }
            }
            ProductsTopSelles = Product_Best_Sellers;
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
                                    // "New",
                                    // "Shipped",
                                    "Delivered"
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
                if (GettingOrderGraphData.length == 0) {

                    var dateStr = moment(parseInt(params.startDate)).format("YYYY-MM-DD");
                    GettingOrderGraphData.push({
                        date: dateStr,
                        count: 0
                    })

                }


                return res.json({
                    response: 3,
                    message: "Admin home page fetch data successfully",
                    TotalOrders: total_order_count,
                    NewOrders: new_count,
                    Inprogress_count: Inprogress_count,
                    Shipped_count: shipped_count,
                    Cancelled_count: cancelled_count,
                    Reject_count: reject_count,
                    Delivered_count: delivered_count,
                    TotalOrdersComparePreviousMonth: TotalOrdersComparePreviousMonth,
                    NewOrdersComparePreviousMonth: NewOrdersComparePreviousMonth,
                    InprogressTotalOrdersComparePreviousMonth: InprogressTotalOrdersComparePreviousMonth,
                    ShippedTotalOrdersComparePreviousMonth: ShippedTotalOrdersComparePreviousMonth,
                    CancelledTotalOrdersComparePreviousMonth: CancelledTotalOrdersComparePreviousMonth,
                    RejectedTotalOrdersComparePreviousMonth: RejectedTotalOrdersComparePreviousMonth,
                    DeliveredTotalOrdersComparePreviousMonth: DeliveredTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: GettingOrderGraphData,
                    NewOrders: Recent_Orders_Fetch
                })

            } else if (params.selectTypeGraph == "Week") {
                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: { $in: ["Delivered"] },
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
                    NewOrders: new_count,
                    Inprogress_count: Inprogress_count,
                    Shipped_count: shipped_count,
                    Cancelled_count: cancelled_count,
                    Reject_count: reject_count,
                    Delivered_count: delivered_count,
                    TotalOrdersComparePreviousMonth: TotalOrdersComparePreviousMonth,
                    NewOrdersComparePreviousMonth: NewOrdersComparePreviousMonth,
                    InprogressTotalOrdersComparePreviousMonth: InprogressTotalOrdersComparePreviousMonth,
                    ShippedTotalOrdersComparePreviousMonth: ShippedTotalOrdersComparePreviousMonth,
                    CancelledTotalOrdersComparePreviousMonth: CancelledTotalOrdersComparePreviousMonth,
                    RejectedTotalOrdersComparePreviousMonth: RejectedTotalOrdersComparePreviousMonth,
                    DeliveredTotalOrdersComparePreviousMonth: DeliveredTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: finalGraphData,
                    NewOrders: Recent_Orders_Fetch
                })

            } else if (params.selectTypeGraph == "Month") {
                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: { $in: ["Delivered"] },
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
                    NewOrders: new_count,
                    Inprogress_count: Inprogress_count,
                    Shipped_count: shipped_count,
                    Cancelled_count: cancelled_count,
                    Reject_count: reject_count,
                    Delivered_count: delivered_count,
                    TotalOrdersComparePreviousMonth: TotalOrdersComparePreviousMonth,
                    NewOrdersComparePreviousMonth: NewOrdersComparePreviousMonth,
                    InprogressTotalOrdersComparePreviousMonth: InprogressTotalOrdersComparePreviousMonth,
                    ShippedTotalOrdersComparePreviousMonth: ShippedTotalOrdersComparePreviousMonth,
                    CancelledTotalOrdersComparePreviousMonth: CancelledTotalOrdersComparePreviousMonth,
                    RejectedTotalOrdersComparePreviousMonth: RejectedTotalOrdersComparePreviousMonth,
                    DeliveredTotalOrdersComparePreviousMonth: DeliveredTotalOrdersComparePreviousMonth,
                    ProductsTopSales: ProductsTopSelles,
                    GraphData: finalGraphData,
                    NewOrders: Recent_Orders_Fetch
                })
            } else if (params.selectTypeGraph == "Year") {
                var GettingOrderGraphData = await Orders_Model.aggregate([
                    {
                        $match: {
                            orderStatus: { $in: ["Delivered"] },
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
                    NewOrders: new_count,
                    Inprogress_count: Inprogress_count,
                    Shipped_count: shipped_count,
                    Cancelled_count: cancelled_count,
                    Reject_count: reject_count,
                    Delivered_count: delivered_count,
                    TotalOrdersComparePreviousMonth: TotalOrdersComparePreviousMonth,
                    NewOrdersComparePreviousMonth: NewOrdersComparePreviousMonth,
                    InprogressTotalOrdersComparePreviousMonth: InprogressTotalOrdersComparePreviousMonth,
                    ShippedTotalOrdersComparePreviousMonth: ShippedTotalOrdersComparePreviousMonth,
                    CancelledTotalOrdersComparePreviousMonth: CancelledTotalOrdersComparePreviousMonth,
                    RejectedTotalOrdersComparePreviousMonth: RejectedTotalOrdersComparePreviousMonth,
                    DeliveredTotalOrdersComparePreviousMonth: DeliveredTotalOrdersComparePreviousMonth,
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