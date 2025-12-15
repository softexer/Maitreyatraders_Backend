
const validations = require('./cartdataValidations');
const dbQuaries = require('./cartdbQuaries')
var cartfecth = {
    cartfectchData: (params, callback) => {
        var { error } = validations.cartfecthdatavalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var cartDatafetch = dbQuaries.cartDataFetchesparams(params);
        cartDatafetch.then((found) => {
            if (found.length > 0) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Cart Data Founded Successfully",
                        Info: found
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Cart Data Founded Failure/No Data Found",
                        Info: found
                    }
                })
            }
        })
    }
}
module.exports = cartfecth;