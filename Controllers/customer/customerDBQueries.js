var customers = require('../../app/Models/customer');
var device = require('../../app/Models/devicetype');
var customerInbox = require('../../app/Models/NotificationInbox')
var db = {
    CustomerRegisterParams: (params, otps, marchentID, date) => {
        console.log("duigfisljhfalsdufa", params, otps, marchentID, date)
        var customerRegi = new customers({
            firstName: params.firstName,
            lastName: params.lastName,
            userID: params.userID,
            PhoneNumber: "+91" + params.PhoneNumber,
            Password: params.Password,
            Otp: otps,
            merchantId: marchentID,
            RegisterDate: date
        })
        return customerRegi;
    },
    customerloginparams: (params) => {
        var date = new Date().getTime();
        var customerRegister = new customers({
            PhoneNumber: "+91" + params.PhoneNumber,
            Otp: params.otpNumber,
            loginStatus: true,
            RegisterDate: date
        })
        return customerRegister;
    },
    Emailfetch: (params) => {
        return customers.findOne({ $or: [{ PhoneNumber: "+91" + params.PhoneNumber }, { userID: params.userID }] })
    },
    EmailorPhoneNumberfetch: (params) => {
        return customers.findOne({ PhoneNumber: "+91" + params.PhoneNumber })
    },
    getNotificationsByUserIDQuery: (params) => {
        return device.find({ PhoneNumber: "+91" + params.PhoneNumber }).exec()
    },
    logoutQuery: (params) => {
        return customers.updateOne({ PhoneNumber: "+91" + params.PhoneNumber }, { $set: { loginStatus: false } }).exec()
    },
    updateDeviceIdTokenByDeviceIdQuery: (params, ID) => {
        if (params.deviceType === 'web') {
            return device.updateOne(
                {
                    _id: ID,
                    PhoneNumber: new RegExp("+91" + params.PhoneNumber, 'i')
                },
                {
                    "$push": {

                        "devices.web": {
                            deviceID: params.deviceId,
                            deviceToken: params.tokenId,
                            login: true
                        }
                    }

                }).exec()

        } else {
            return device.updateOne(
                {
                    _id: ID,
                    PhoneNumber: new RegExp("+91" + params.PhoneNumber, 'i')
                },
                {
                    $push: {

                        "devices.mobile": {
                            deviceID: params.deviceId,
                            deviceToken: params.tokenId,
                            login: true
                        }
                    }

                }).exec()
        }
    },
    addingNewDeviceIdTokenQuery: (params) => {
        if (params.deviceType === 'web') {
            var obj = new device({
                PhoneNumber: "+91" + params.PhoneNumber,
                devices: {
                    web: [{
                        deviceID: params.deviceId,
                        deviceToken: params.tokenId,
                        login: true
                    }]
                }
            });
            return obj;
        } else {
            var obj = new device({
                PhoneNumber: "+91" + params.PhoneNumber,
                devices: {
                    mobile: [{
                        deviceID: params.deviceId,
                        deviceToken: params.tokenId,
                        login: true
                    }]
                }
            });
            return obj;
        }

    },
    logoutUserFromDeviceQuery: (params) => {
        if (params.deviceType === 'web') {
            return device.updateMany({
                'PhoneNumber': "+91" + params.PhoneNumber,
                //'devices.web.deviceID': params.deviceID,
                "devices.web.deviceID": params.deviceId,
                'devices.web.deviceToken': params.tokenId
            },
                {
                    '$set':
                    {

                        'devices.web.$.login': false
                    }
                }
            ).exec()
        } else {
            return device.updateMany({
                'PhoneNumber': "+91" + params.PhoneNumber,
                'devices.mobile.deviceID': params.deviceId,
                'devices.mobile.deviceToken': params.tokenId
            },
                {
                    '$set':
                    {

                        'devices.mobile.$.login': false
                    }
                }
            ).exec()
        }
    },
    updateDeviceIdTokenQuery: (params) => {
        if (params.deviceType === 'web') {
            return device.updateOne(
                {
                    'PhoneNumber': "+91" + params.PhoneNumber,
                    'devices.web.deviceID': params.deviceId
                },
                {
                    '$set':
                    {
                        'devices.web.$': {
                            deviceToken: params.tokenId,
                            deviceID: params.deviceId,
                            login: true
                        }

                    }
                }).exec()
        } else {
            return device.updateOne(
                {
                    'PhoneNumber': "+91" + params.PhoneNumber,
                    'devices.mobile.deviceID': params.deviceID
                },
                {
                    '$set':
                    {
                        'devices.mobile.$': {
                            deviceToken: params.tokenId,
                            deviceID: params.deviceId,
                            login: true
                        }

                    }
                }).exec()
        }

    },
    updateDeviceIdTokenByDeviceIdQuery: (params, ID) => {
        if (params.deviceType === 'web') {
            return device.updateOne(
                {
                    _id: ID,
                    PhoneNumber: new RegExp("+91" + params.PhoneNumber, 'i')
                },
                {
                    "$push": {

                        "devices.web": {
                            deviceID: params.deviceId,
                            deviceToken: params.tokenId,
                            login: true
                        }
                    }

                }).exec()

        } else {
            return device.updateOne(
                {
                    _id: ID,
                    PhoneNumber: "+91" + params.PhoneNumber
                },
                {
                    $push: {

                        "devices.mobile": {
                            deviceID: params.deviceId,
                            deviceToken: params.tokenId,
                            login: true
                        }
                    }

                }).exec()
        }
    },
    updateDeviceIdTokenQuery: (params) => {
        if (params.deviceType === 'web') {
            return notify.updateOne(
                {
                    'userID': params.userID,
                    'devices.web.deviceID': params.deviceID
                },
                {
                    '$set':
                    {
                        'devices.web.$': {
                            deviceToken: params.deviceToken,
                            deviceID: params.deviceID,
                            login: true
                        }

                    }
                }).exec()
        } else {
            return notify.updateOne(
                {
                    'userID': params.userID,
                    'devices.mobile.deviceID': params.deviceID
                },
                {
                    '$set':
                    {
                        'devices.mobile.$': {
                            deviceToken: params.deviceToken,
                            deviceID: params.deviceID,
                            login: true
                        }

                    }
                }).exec()
        }

    },
    updatecustomerparams: (params, CartIDGenerate) => {
        return customers.updateOne({ PhoneNumber: "+91" + params.PhoneNumber },
            { $set: { Otp: params.otpNumber, loginStatus: true } })
    },
    customerDatafindthisparams: (params) => {
        return customers.findOne({ $and: [{ merchantId: params.merchantId }, { PhoneNumber: "+91" + params.PhoneNumber }] })
    },
    insertNotificationInbox: (params) => {
        var inbox = new customerInbox({
            PhoneNumber:"+91" + params.PhoneNumber
        })
        return inbox;
    }
}
module.exports = db;