var validations = require('./validationstodaydeals');
var dbQuaries = require('./dbQuariestodaydeals');

var PID = require('../Core/cartID');
var insertapi = {
    todaydealsinsert: (params, req, callback) => {
        const { error } = validations.insertProductsparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingdata = dbQuaries.checkingcategoryIDandSubcategoryID(params);
        checkingdata.then((found) => {
            console.log(found)
            if (found) {
                var pid = PID.cartID(9);
                var date = new Date().getTime();
                var projectid = "PID" + "@" + pid + date;
                var imageid = "pid" + pid + '@';
                if (req.files != null) {
                    var file = req.files.productimage;
                    var filename = req.files.productimage.name;
                    var filemvpath = './public/images/DailyDealsimages/' + imageid + filename;
                    var filedbpath = '/images/DailyDealsimages/' + imageid + filename;
                    file.mv(filemvpath, (err) => {
                        if (err) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "something went to wrong"
                                }
                            })
                        } else {
                            var insertsellerproduct = dbQuaries.insertsellerproductparamsData(params, projectid, date, filedbpath);
                            insertsellerproduct.save((inserted) => {
                                console.log(inserted)
                                if (!inserted) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 3,
                                            message: "Product inserted successfully"
                                        }
                                    })
                                } else {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "Product inserted Failure"
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
                            message: "please upload image"
                        }
                    })
                }

            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "CategoryID/subCategory Data not found"
                    }
                })
            }
        })
    }
}
module.exports = insertapi;