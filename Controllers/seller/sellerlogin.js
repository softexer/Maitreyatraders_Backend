var validations = require('./sellerValidations');
var dbQuaries = require('./sellerdbQuaries');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var config = require('../../app/ConfigFiles/config.json');
var login = {
    Sellerlogin: (params, callback) => {
        console.log(params)
        var { error } = validations.loginvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var datafetchlogin = dbQuaries.logindatafindparams(params);
        datafetchlogin.then((found) => {
            console.log(found)
            if (found) {
                console.log(params.Password, found.Password)
                var passwordIsValid = bcrypt.compareSync(
                    params.Password,
                    found.Password
                );
                if (passwordIsValid) {
                    var token = jwt.sign({ id: found.PhoneNumber }, config.secretkey)
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "login successfully",
                            jsontoken: token,
                            Info: found
                        }
                    })

                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "there is no match Password"
                        }
                    })
                }
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "there is no match mobileNumer/UserID"
                    }
                })
            }
        })
    },
    SellerUpdatePassword: (params, callback) => {
        var { error } = validations.SellerUpdatePasswordvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var password = bcrypt.hashSync(params.Password, 10);
        var checkingdata = dbQuaries.findDataforupdatepassword(params);
        checkingdata.then((founded) => {
            if (founded) {
                var phone = founded.PhoneNumber;
                var updatepassword = dbQuaries.passwordupdateparams(params, phone, password);
                updatepassword.then((updated) => {
                    if (updated.modifiedCount > 0) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "Password updated Successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Password updated Failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "there is no match mobileNumer/UserID"
                    }
                })
            }
        })
    },
    Sellerdatafetch: (params, callback) => {
        var { error } = validations.fetchsellerdata(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var fetchdataseller = dbQuaries.sellerdataget(params);
        fetchdataseller.then((found) => {
            if (found) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "SellerData Fetch Sucessfully",
                        Info: found
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Seller Data Not Found"
                    }
                })
            }
        })

    }

}
module.exports = login;