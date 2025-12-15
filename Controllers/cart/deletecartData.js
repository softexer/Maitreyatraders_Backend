
const validations = require('./cartdataValidations');
const dbQuaries = require('./cartdbQuaries')
var deletecart = {
    cartdeleteData: (params, callback) => {
        var { error } = validations.deletecartdatavalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    status: 0,
                    message: error.details[0].message
                }
            })
        }
        var deleteData = dbQuaries.cartDatadeleteparams(params);
        deleteData.then((Deleted) => {
            console.log(Deleted)
            if (Deleted.deletedCount>0) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Cart data Deleted Successfully"
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Cart data Deleted failure"
                    }
                })
            }
        })

    },
    cartdataDeleteall: (params, callback) => {
        var { error } = validations.cartdataDeleteallvalidationsparams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    status: 0,
                    message: error.details[0].message
                }
            })
        }
        var deleteData = dbQuaries.cartDatadeleteallparams(params);
        deleteData.then((Deleted) => {
            if (Deleted) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Cart data Deleted Successfully"
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Cart data Deleted Successfully"
                    }
                })
            }
        })


    }
}
module.exports = deletecart;