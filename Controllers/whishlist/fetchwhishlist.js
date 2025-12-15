var validations = require('./validationswhishlist');
var dbQuaries = require('./dbQuarieswhishlist')

var whishlistfetchdata = {
    whishlistfetch: (params, callback) => {
        var { error } = validations.fetchwhishlistvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })

        }
        var fetchData = dbQuaries.whishlistfetchdata(params);
        fetchData.then((found) => {
            if (found.length > 0) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Data found Successfully",
                        Info: found
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Data not found "
                    }
                })
            }
        })
    }
}
module.exports = whishlistfetchdata;