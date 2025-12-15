var validations = require('./validationProducts');
var dbQuaries = require('./dbQuariesProducts');

var searchdata = {
    customersearchproducts: (params, callback) => {
        var { error } = validations.searchdatavalidationparams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var searchdataproducts = dbQuaries.productssearchfetchData(params);
        searchdataproducts.then((found) => {
            if (found.length>0) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "search Data Founded successfully",
                        Info:found
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "No Data found",
                        Info:found
                    }
                })
            }
        })
    }
}
module.exports=searchdata;