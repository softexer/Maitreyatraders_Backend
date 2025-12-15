var validations = require('./customeraddressvalidation');
var dbQuaries = require('./customerAddressDbQuaries');

var fetch = {
    useraddressfectchData: (params, callback) => {
        var { error } = validations.fetchCustomeraddressparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var userAddressData = dbQuaries.userAddressFetch(params);
        userAddressData.then((founded) => {
            if (founded.length > 0) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Customers Data Founded Successfully",
                        Info: founded
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Customers Data Founded Failure",
                        Info: founded
                    }
                })
            }
        })
    }
}
module.exports = fetch;