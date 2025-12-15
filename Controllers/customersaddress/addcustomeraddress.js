var validations = require('./customeraddressvalidation');
var dbQuaries = require('./customerAddressDbQuaries');

var useraddAddress = {
    useraddressaddData: (params, callback) => {
        var { error } = validations.addcustomerDataparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var customersDatachecking = dbQuaries.customerDatacheckingparams(params);
        customersDatachecking.then((found) => {
            if (found) {
                var addressinsertData = dbQuaries.customeraddressinsertparams(params);
                addressinsertData.save((inserted) => {
                    if (!inserted) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "Customer address inserted Successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Customer address inserted Failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Customer Data Not Found in DataBase"
                    }
                })
            }
        })
    }
}
module.exports = useraddAddress;