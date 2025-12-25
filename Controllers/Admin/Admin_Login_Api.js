var Joi = require('@hapi/joi');
var Admin_Model = require('../../app/Models/Admin');
var Device_Model = require('../../app/Models/devicetype')
var bcrypt = require('bcryptjs');
module.exports.Admin_Login_Api = async function Admin_Login_Api(req, res) {
    try {
        var params = req.body;
        var Validate_Admin = Joi.object({
            emailID: Joi.string().strict().required(),
            password: Joi.string().strict().required(),
            deviceType: Joi.string().strict().valid("web", "mobile").required(),
            deviceID: Joi.string().strict().required(),
            deviceToken: Joi.string().strict().required()
            //https://api.softexer.com/api/hire/getBookings
        })

        var result = await Validate_Admin.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }

        var checking_Admin_EmailID = await Admin_Model.findOne({ emailID: params.emailID }).exec();
        if (checking_Admin_EmailID) {
            var passwordcompare = bcrypt.compareSync(params.password, checking_Admin_EmailID.password);
            if (passwordcompare) {
                var Checking_Device = await Device_Model.findOne({
                    useruniqueID: checking_Admin_EmailID.adminuniqueID
                })
                if (Checking_Device) {
                    if (params.deviceType == "web") {
                        var CheckingDeviceID = await Device_Model.findOne({
                            useruniqueID: checking_Admin_EmailID.adminuniqueID,
                            "devices.web.deviceID": params.deviceID
                        })
                        if (CheckingDeviceID) {
                            var updatedevice = await Device_Model.updateOne({
                                useruniqueID: checking_Admin_EmailID.adminuniqueID,
                                "devices.web.deviceID": params.deviceID
                            },
                                {
                                    $set: {
                                        "devices.web.$.deviceToken": params.deviceToken,
                                        "devices.web.$.login": true
                                    }

                                }
                            )
                        } else {
                            var updatedevice = await Device_Model.updateOne({
                                useruniqueID: checking_Admin_EmailID.adminuniqueID,

                            },
                                {
                                    "$push": {
                                        "devices.web": {
                                            deviceID: params.deviceID,
                                            deviceToken: params.deviceToken,
                                            login: true
                                        }
                                    }
                                }
                            )
                        }
                    } else {
                        var CheckingDeviceID = await Device_Model.findOne({
                            useruniqueID: checking_Admin_EmailID.adminuniqueID,
                            "devices.mobile.deviceID": params.deviceID
                        })
                        if (CheckingDeviceID) {
                            var updatedevice = await Device_Model.updateOne({
                                useruniqueID: checking_Admin_EmailID.adminuniqueID,
                                "devices.mobile.deviceID": params.deviceID
                            },
                                {
                                    $set: {
                                        "devices.mobile.$.deviceToken": params.deviceToken,
                                        "devices.mobile.$.login": true

                                    }

                                }
                            )
                        } else {
                            var updatedevice = await Device_Model.updateOne({
                                useruniqueID: checking_Admin_EmailID.adminuniqueID,

                            },
                                {
                                    "$push": {
                                        "devices.mobile": {
                                            deviceID: params.deviceID,
                                            deviceToken: params.deviceToken,
                                            login: true
                                        }
                                    }
                                }
                            )
                        }
                    }
                } else {
                    if (params.deviceType == "web") {
                        var insertdatadevice = await Device_Model.insertMany([{
                            useruniqueID: checking_Admin_EmailID.adminuniqueID,
                            devices: {
                                web: [{
                                    deviceID: params.deviceID,
                                    deviceToken: params.deviceToken,
                                    login: true
                                }]
                            }
                        }])
                        console.log("web", insertdatadevice)
                    } else {
                        var insertdatadevice = await Device_Model.insertMany([{
                            useruniqueID: checking_Admin_EmailID.adminuniqueID,
                            devices: {
                                mobile: [{
                                    deviceID: params.deviceID,
                                    deviceToken: params.deviceToken,
                                    login: true
                                }]
                            }
                        }])
                        console.log("mobile", insertdatadevice)
                    }


                }
                return res.json({ response: 3, message: "Admin login success",loginInfo:checking_Admin_EmailID })

            } else {
                return res.json({ response: 0, message: "password is wrong" })
            }

        } else {
            return res.json({ response: 0, message: "EmailID data not found" })
        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}