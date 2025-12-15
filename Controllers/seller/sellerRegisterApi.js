var validations = require('./sellerValidations');
var dbQuaries = require('./sellerdbQuaries');

const bcrypt = require('bcryptjs');
var RegisterSeller = {
    SellerRegister: (params, callback) => {
        const { error } = validations.SellerRegisterparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var password = bcrypt.hashSync(params.Password);
        console.log("passwored", password)
        var sellerDatachecking = dbQuaries.fecthsellerdata(params);
        sellerDatachecking.then((founded) => {
            if (founded) {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Already use this PhoneNumber/userID"
                    }
                })
            } else {
                var checkingseller = dbQuaries.sellerDatafetch(params);
                checkingseller.then((found) => {
                    var sellercount = found.length;
                    //if(sellercount == 0){
                    var registerseller = dbQuaries.registersellerparams(params, password);
                    registerseller.save((inserted) => {
                        if (!inserted) {
                            var dashboard = dbQuaries.dashboardinsertedparam(params);
                            dashboard.save((insert) => {
                                if (!insert) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 3,
                                            message: "Seller Registration Successfully completed"
                                        }
                                    })
                                } else {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "Seller Registration Successfully completed but dash borad inserted phonenumber failure"
                                        }
                                    })
                                }
                            })

                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "Seller Registration Failure"
                                }
                            })
                        }
                    })
                    // }else{
                    //     return callback({
                    //         status:200,
                    //         data:{
                    //             response:0,
                    //             message:"Already Seller Register One member Another seller is not Register"
                    //         }
                    //     })
                    // }
                })
            }
        })
    }
}
module.exports = RegisterSeller;