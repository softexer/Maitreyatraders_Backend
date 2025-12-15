var validations = require('./validationstodaydeals');
var dbQuaries = require('./dbQuariestodaydeals');

var fs = require('fs');
var deleteproduct = {
    todaydealsdelete: (params, callback) => {
        const { error } = validations.deleteProductsparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var fetchdata = dbQuaries.fetchproductsdata(params)
        fetchdata.then((found) => {
            if (found.length > 0) {
                var deletefetchapi = dbQuaries.deleteproductsdataparams(params);
                deletefetchapi.then((deleted) => {
                    console.log(deleted)
                    if (deleted) {
                        var imagespathfetch = [];
                        for (var a = 0; a < found.length; a++) {
                            if (found[a].ProductImage) {
                                var im = "./public"+found[a].ProductImage;
                                imagespathfetch.push(im);
                            }
                        }
                        imagespathfetch.map(file => {
                            fs.unlink(file, err => {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        })
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "dailydeals deleted successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "dailydeals deleted Failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Data Not found"
                    }
                })
            }
        })


    }
}
module.exports = deleteproduct;