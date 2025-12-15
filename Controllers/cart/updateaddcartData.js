
const validations = require('./cartdataValidations');
const dbQuaries = require('./cartdbQuaries')
var cartupdate = {
    cartupdateData: (params, callback) => {
        var { error } = validations.cartupdateDatavalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingData = dbQuaries.cartDataChecking(params);
        checkingData.then((found) => {
            if (found) {
                var updateDatacart = dbQuaries.cartdataupdatedparams(params);
                updateDatacart.then((updated) => {
                    console.log(updated)
                    if (updated.modifiedCount>0) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "addcart Data updated Successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "addcart Data updated Failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "addcart No Data Found "
                    }
                })
            }
        })

    }
}
module.exports = cartupdate;