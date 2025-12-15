var validations = require('./customeraddressvalidation');
var dbQuaries = require('./customerAddressDbQuaries');

var update = {
    useraddressupdateDataupdateData: (params, callback) => {
        var { error } = validations.customeraddressupdateparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingcustomeraddress = dbQuaries.customerAddressCheckingParams(params);
        checkingcustomeraddress.then((founded) => {
            if (founded) {
                var updatecustomeraddress = dbQuaries.updateCustomersAddressData(params);
                updatecustomeraddress.then((updated) => {
                    if (updated) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "Customer address updated Successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Customer address updated failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "AddressID Not Found DataBase"
                    }
                })
            }
        })
    }
}
module.exports = update;