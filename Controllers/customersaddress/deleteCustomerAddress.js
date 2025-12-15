

const validations = require('./customeraddressvalidation');
const dbQuaries = require('./customerAddressDbQuaries')
var useraddressdelete = {
    useraddressdeleteData: (params, callback) => {
        var { error } = validations.useraddressdeleteDatavalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var cartDatafetch = dbQuaries.useraddressdeleteDataparams(params);
        cartDatafetch.then((Deleted) => {
            if (Deleted) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "customerAddress Data Deleted Successfully",
                        
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "customerAddress Data Deleted Failure",
                      
                    }
                })
            }
        })
    }
}
module.exports = useraddressdelete;