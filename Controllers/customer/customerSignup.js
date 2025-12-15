

const dbQuaries = require('./customerDBQueries');
const validations = require('./customerParamValidations');
var signup = {
    signupCustomer: (params, callback) => {
        var { error } = validations.signupvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var CustomerDataChecking = dbQuaries.customerDatafindthisparams(params);
        CustomerDataChecking.then((founded) => {
            if (founded) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Signup Data Founded Successfully",
                        userInfo:founded
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Signup Data Founded Failure"
                    }
                })
            }
        })
    }
}
module.exports = signup;