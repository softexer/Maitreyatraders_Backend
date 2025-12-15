var validations = require('./customerParamValidations');
var dbQuaries = require('./customerDBQueries');

var carts = require('../Core/cartID');
var moment = require('moment')
var jwt = require('jsonwebtoken');
var config = require('../../app/ConfigFiles/config.json');

var login = {
    verifyCustomer: (params, callback) => {
        const { error } = validations.loginvalidateParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        if (params.PhoneNumber.length === 10) {
            var MobileNumberchecking = dbQuaries.EmailorPhoneNumberfetch(params);
            MobileNumberchecking.then((founded) => {
                if (founded) {
                    console.log("date", founded)
                    if (params.deviceType === 'web') {
                        let getNotificationQuery = dbQuaries.getNotificationsByUserIDQuery(params);
                        getNotificationQuery.then((notifications) => {
                            if (notifications.length > 0) {
                                var found = false;
                                for (var i = 0; i < notifications[0].devices.web.length; i++) {
                                    if (notifications[0].devices.web[i].deviceToken == params.deviceToken) {
                                        found = true;
                                        let updateDeviceQuery = dbQuaries.updateDeviceIdTokenQuery(params);
                                        updateDeviceQuery.then((update) => {
                                            console.log('updated...', update);
                                        })
                                        break;
                                    }
                                }
                                if (found === false) {
                                    let updateDeviceByIDQuery = dbQuaries.updateDeviceIdTokenByDeviceIdQuery(params, notifications[0]._id);
                                    updateDeviceByIDQuery.then((notifyPushed) => {
                                    })
                                }
                            } else {
                                let insertDeviceQuery = dbQuaries.addingNewDeviceIdTokenQuery(params);
                                insertDeviceQuery.save((success) => {
                                })
                            }
                        })
                    } else {
                        let getNotificationQuery = dbQuaries.getNotificationsByUserIDQuery(params);
                        getNotificationQuery.then((notifications) => {
                            if (notifications.length > 0) {
                                console.log(notifications[0].devices.mobile);
                                var found = false
                                for (var i = 0; i < notifications[0].devices.mobile.length; i++) {
                                    if (notifications[0].devices.mobile[i].deviceID == params.deviceID) {
                                        found = true;
                                        let updateDeviceQuery = dbQuaries.updateDeviceIdTokenQuery(params);
                                        updateDeviceQuery.then((update) => {

                                        })
                                        break;
                                    }
                                }
                                if (found === false) {

                                    let updateDeviceByIDQuery = dbQuaries.updateDeviceIdTokenByDeviceIdQuery(params, notifications[0]._id);
                                    updateDeviceByIDQuery.then((notifyPushed) => {

                                    })
                                }
                            } else {
                                let insertDeviceQuery = dbQuaries.addingNewDeviceIdTokenQuery(params);
                                insertDeviceQuery.save((success) => {

                                })
                            }
                        })
                    }
                    var updatecustomer = dbQuaries.updatecustomerparams(params);
                    updatecustomer.then((updated) => {
                        var MobileNumberchecking = dbQuaries.EmailorPhoneNumberfetch(params);
                        MobileNumberchecking.then((userInfo) => {
                            var token = jwt.sign({ id: "+91" + params.PhoneNumber }, config.secretkey);

                            if (updated) {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 3,
                                        message: "Customer login Successfully",
                                        jsontoken: token,
                                        userInfo: userInfo
                                    }
                                })
                            } else {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "Customer login failed"
                                        //Info: CartIDGenerate
                                    }
                                })
                            }
                        })
                    })
                } else {

                    let insertDeviceQuery = dbQuaries.addingNewDeviceIdTokenQuery(params);
                    insertDeviceQuery.save((success) => {
                        console.log(success);
                    })
                    var updatecustomer = dbQuaries.customerloginparams(params);
                    updatecustomer.save((data) => {
                        var inboxinsert = dbQuaries.insertNotificationInbox(params);
                        inboxinsert.save((inserted) => {
                            var MobileNumberchecking = dbQuaries.EmailorPhoneNumberfetch(params);
                            MobileNumberchecking.then((userInfo) => {
                                var token = jwt.sign({ id: "+91" + params.PhoneNumber }, config.secretkey);
                                //console.log("insertupdated", err)
                                if (!userInfo) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "Customer login failed"
                                            // cartID: CartIDGenerate
                                        }
                                    })
                                } else {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 3,
                                            message: "Customer login Successfully ",
                                            jsontoken: token,
                                            userInfo: userInfo
                                            // Info: CartIDGenerate
                                        }
                                    })
                                }
                            });
                        })
                    });
                }

            })
        } else {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "Only give 10 digits mobile number "
                }
            })
        }
    }
}
module.exports = login;