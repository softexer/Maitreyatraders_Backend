var validations = require('./validationsdashboard');
var dbQuaries = require('./dbQuariesdashboard');

var fs = require('fs');
var path = require('path');
var updateapi = {
    dashboardupdate: (params, req, callback) => {
        var { error } = validations.dashboardupdateparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingData = dbQuaries.dashboardcheckingDataparams(params);
        checkingData.then((found) => {
            if (found) {
                if (req.files != null) {
                    var file = req.files.image;
                    var filename = file.name;
                    if (params.type === "Advertiesments") {
                        var foundimage = found.advertisements[0].advertiesmentImage;
                        var basenamefile = path.basename(foundimage);
                        var replacename = filename.replace(filename, basenamefile);
                        var filemvpath = './public/images/dashboardimages/' + replacename;
                        var filedbpath = '/images/dashboardimages/' + replacename;
                    } else {
                        var foundimage = found.baners[0].banerImage;
                        var basenamefile = path.basename(foundimage);
                        var replacename = filename.replace(filename, basenamefile);
                        var filemvpath = './public/images/dashboardimages/' + replacename;
                        var filedbpath = '/images/dashboardimages/' + replacename;
                    }
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
                            var updateData = dbQuaries.updatedashboardDataparams(params, filedbpath);
                            updateData.then((updated) => {
                                if (updated) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 3,
                                            message: "Data updated successfully"
                                        }
                                    })
                                } else {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "Data updated Failure"
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
                        message: "Data not found"
                    }
                })
            }
        })
    }
}
module.exports = updateapi