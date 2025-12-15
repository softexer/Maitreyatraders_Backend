var validations = require('./sellerValidations');
var dbQuaries = require('./sellerdbQuaries');

var notify = require('../Core/sendnotification');
var Mail = require('../Core/Mailer');
var vmartorders = {
    totalorders: (params, callback) => {
        const { error } = validations.totalordersparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var data = params.type;
        var splitesdata = data.split(',');
        var splitesdatalength = splitesdata.length;
        if (data === "All") {
            var totaldatachecking = dbQuaries.totalordersfetchparams(params);
            totaldatachecking.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data founded successfully",
                            Info: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No Data Found",
                            Info: found
                        }
                    })
                }
            })
        } else if (data === "Conform") {
            var totaldatachecking = dbQuaries.totalordersfetchparams(params);
            totaldatachecking.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data founded successfully",
                            Info: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No Data Found",
                            Info: found
                        }
                    })
                }
            })
        } else if (data === "Reject") {
            var totaldatachecking = dbQuaries.totalordersfetchparams(params);
            totaldatachecking.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data founded successfully",
                            Info: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No Data Found",
                            Info: found
                        }
                    })
                }
            })
        } else if (data === "InProcess") {
            var totaldatachecking = dbQuaries.totalordersfetchparams(params);
            totaldatachecking.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data founded successfully",
                            Info: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No Data Found",
                            Info: found
                        }
                    })
                }
            })
        } else if (data === "Cancel") {
            var totaldatachecking = dbQuaries.totalordersfetchparams(params);
            totaldatachecking.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data founded successfully",
                            Info: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No Data Found",
                            Info: found
                        }
                    })
                }
            })
        } else if (splitesdatalength > 1) {
            console.log(splitesdata);
            var d1 = splitesdata[0]
            var d2 = splitesdata[1]
            var totaldatachecking = dbQuaries.dateRangetotalordersfetchparams(d1, d2);
            totaldatachecking.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data founded successfully",
                            Info: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No Data Found",
                            Info: found
                        }
                    })
                }
            })
        } else {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "Please pass correct Value"
                }
            })
        }


    },
    orderconform: (params, callback) => {
        const { error } = validations.ordersconformparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingorderID = dbQuaries.fetchordersdata(params);
        checkingorderID.then((found) => {
            if (found) {
                if (params.orderstatus === "Reject" || "Conform") {
                    var orderupdatedata = dbQuaries.updatedataorederparams(params);
                    orderupdatedata.then((updated) => {
                        if (updated.modifiedCount > 0) {
                            if (params.orderstatus === "Conform") {
                                var productsids = found.Products;
                                for (var a = 0; a < productsids.length; a++) {
                                    if (productsids[a].ProductID) {
                                        var pdid = productsids[a].ProductID;
                                        var pdquantity = productsids[a].quantity;
                                        var fetchproductdata = dbQuaries.productidbasedfetchData(pdid);
                                        fetchproductdata.then((fetched) => {
                                            var sellerproductQuantity = fetched.stockquantity;
                                            var productquantitycalculate = parseInt(sellerproductQuantity) - parseInt(pdquantity);
                                            var updateproduct = dbQuaries.updateproductquantity(pdid, productquantitycalculate);
                                            updateproduct.then((updatedproduct) => { console.log("success") })
                                            if (0 >= productquantitycalculate) {
                                                var updateproduct = dbQuaries.updateproductstatus(pdid);
                                                updateproduct.then((updatedproduct) => { console.log("success") })
                                            }
                                        })
                                    }
                                }
                            }
                            var phone = found.PhoneNumber;
                            var customerdatafetchusewithmobilenumber = dbQuaries.customerdatagetmobilenumber(phone);
                            customerdatafetchusewithmobilenumber.then((founded) => {

                                var data = {
                                    notification: {
                                        "title": "V_Mart",
                                        "body": "Your order" + " " + params.orderstatus,
                                        "sound": "notification_alertsound.mp3"
                                    },
                                    data: {
                                        "orderID": found.orderId
                                    }
                                }
                                var sendNotification = notify.sendNotifications(phone, data);
                                if (founded) {
                                    Mail.sendMailorderstatuspurpose("Order status", found, founded.userID)
                                }

                                return callback({
                                    status: 200,
                                    data: {
                                        response: 3,
                                        message: "order_status updated Successfully"
                                    }
                                })



                            })
                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "order_status updated Failure"
                                }
                            })
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "orderstatus Only Pass this Values Reject and Conform"
                        }
                    })
                }
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "this orderId Data Not Found"
                    }
                })
            }
        })

    }
}
module.exports = vmartorders;