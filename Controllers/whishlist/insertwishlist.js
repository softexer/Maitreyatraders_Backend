var validations = require('./validationswhishlist');
var dbQuaries = require('./dbQuarieswhishlist')

var insert = {
    whishlistinsert: (params,callback) => {
        var { error } = validations.insertwhishlistValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var fetchproductdata = dbQuaries.fetchproductdataparams(params);
        fetchproductdata.then((found) => {
            if (found) {
                var checkingdata = dbQuaries.checkingdatawhishlistdbparams(params);
                checkingdata.then((founded) => {
                    if (founded) {
                        var count = founded.countViews;
                        var c = 1;
                        var countviews = count + c;
                        var updatedata = dbQuaries.updatedcountviews(params, countviews);
                        updatedata.then((updated) => {
                            if (updated) {
                                
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 3,
                                        message: "whishlist Data updated successfully"
                                    }
                                })
                            } else {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "whishlist Data updated Failure"
                                    }
                                })
                            }
                        })
                    } else {
                        var insertdata = dbQuaries.insertedwhishlistdata(params, found);
                        insertdata.save((inserted) => {
                            if (!inserted) {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 3,
                                        message: "whishlist Data inserted successfully"
                                    }
                                })
                            } else {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "whishlist Data inserted Failure"
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Product Data not found"
                    }
                })
            }
        })

    }
}
module.exports = insert;