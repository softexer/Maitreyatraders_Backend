var validations = require('./validationsdashboard');
var dbQuaries = require('./dbQuariesdashboard');

var fs = require('fs');
var path = require('path');
var deleteapi = {
    dashboardremoveinserdata: (params, callback) => {
        var { error } = validations.dashboarddeleteinsertDataparamsValidations(params);
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
                if (params.type === "Advertiesments") {
                    var foundimage = found.advertisements[0].advertiesmentImage;
                    var filemvpath = './public' + foundimage;
                } else {
                    var foundimage = found.baners[0].banerImage;
                    var filemvpath = './public' + foundimage;
                }
                fs.unlink(filemvpath, (err) => {
                    if (err) {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "something went to wrong"
                            }
                        })
                    } else {
                        var updateData = dbQuaries.removeDatadashboardparams(params);
                        updateData.then((updated) => {
                            if (updated) {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 3,
                                        message: "Data remove successfully"
                                    }
                                })
                            } else {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "Data remove Failure"
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
                        message: "Data not found"
                    }
                })
            }
        })
    }
}
module.exports = deleteapi;