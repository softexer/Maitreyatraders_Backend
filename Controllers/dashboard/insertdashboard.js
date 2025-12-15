var validations = require('./validationsdashboard');
var dbQuaries = require('./dbQuariesdashboard');

var fs = require('fs');
var path = require('path');
var Id = require('../Core/cartID')
var insertapi = {
    dashboardinsert: (params, req, callback) => {
        var { error } = validations.dashboardinsertparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var dashboard = dbQuaries.checkingphoneNumberdb(params);
        dashboard.then((found) => {
            if (found) {
                var checkingcategories = dbQuaries.checkingCategoryNameandsubcategoryName(params);
                checkingcategories.then((founded) => {
                    console.log(founded)
                    if (founded) {
                        if (req.files != null) {
                            var file = req.files.image;
                            var filename = file.name;
                            var ids = Id.cartID(5);
                            var generateID = Id.cartID(12)
                            var date = new Date().getTime();
                            var filemvpath = './public/images/dashboardimages/' + ids + date + filename;
                            var dbpathimage = '/images/dashboardimages/' + ids + date + filename;
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
                                    var categoryid = founded.categoryID;
                                    var subcategoryid = founded.subCategorys[0].subCategoryID;
                                    var inserteddashboardDatas = dbQuaries.inserteddashboardDataparams(params, generateID, dbpathimage, categoryid, subcategoryid);
                                    inserteddashboardDatas.then((inserted) => {
                                        if (inserted) {
                                            return callback({
                                                status: 200,
                                                data: {
                                                    response: 3,
                                                    message: "DashBoard Data inserted Successfully"
                                                }
                                            })
                                        } else {
                                            return callback({
                                                status: 200,
                                                data: {
                                                    response: 0,
                                                    message: "DashBoard Data inserted Failure"
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
                                message: "CategoryName/SubCategoryName not match"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "this phone number not match"
                    }
                })
            }
        })
    }
}
module.exports = insertapi;