
const dbQuaries = require('./customerDBQueries');
const validations = require('./customerParamValidations');
var mailer = require('../Core/Mailer');
var otp = require('../Core/GenerateOtp');
var marchent = require('../Core/cartID');
var Register = {
    RegisterCustomer: (params, callback) => {
        var { error } = validations.Registervalidation(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        if (params.PhoneNumber.length == 10) {
            var fetchdata = dbQuaries.Emailfetch(params)
            fetchdata.then((founded) => {
                console.log(founded)
                if (founded) {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "Customer Register Already this Email/MobileNumber "
                        }
                    })
                } else {
                    var otps = otp.generateOTP(4);
                    var merchentIDgenerate = marchent.cartID(10);
                    var date = new Date().getTime();
                    var marchentID = merchentIDgenerate + '@' + date;
                    var customerregister = dbQuaries.CustomerRegisterParams(params, otps, marchentID, date);
                    customerregister.save((inserted) => {
                        console.log("checking", inserted)
                        if (!inserted) {
                            //mailer.userForgotPasswordOTPSentToMail("Registration Successfull", params.userID, otps)
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "Customer Register Inserted Successfully"
                                }
                            })
                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "Customer Register Inserted Failure"
                                }
                            })
                        }
                    })
                }
            })
        } else {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "Please Enter Ten Digits Mobile Number"
                }
            })
        }
    }
}
module.exports = Register;
