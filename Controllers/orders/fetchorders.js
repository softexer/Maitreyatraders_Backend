var validations = require('./ordersvalidations');
var dbQuaries = require('./ordersdbQuarys');

var myorderslist = {
    myorders: (params, callback) => {
        var { error } = validations.myorderslistparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }

        var datafetchorderslist = dbQuaries.myorderslistfetchdata(params);
        datafetchorderslist.then((found) => {
            if (found.length > 0) {
                return callback({
                    status: 200,
                    data:{

                    
                    response: 3,
                    message: "orderslist Data found successfully",
                    Info: found
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data:{
                    response: 0,
                    message: "orderslist Data found Failure",
                    Info: found
                    }
                })
            }
        })

    }
}
module.exports=myorderslist;