
var validations = require('./validationswhishlist');
var dbQuaries = require('./dbQuarieswhishlist')

var whishlistdeletedata = {
    whishlistdelete: (params, callback) => {
        var { error } = validations.deletewhishlistvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })

        }
        var fetchData = dbQuaries.whishlistdeletedata(params);
        fetchData.then((deleted) => {
            if (deleted) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Data deleted Successfully"
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
module.exports = whishlistdeletedata;