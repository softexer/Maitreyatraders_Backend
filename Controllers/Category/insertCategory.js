var validations = require('./validationsCategory');
var dbQuaries = require('./categorydbQuaries');

var ID = require('../Core/cartID')
var fs = require('fs')
var insertcategory = {
    categoryinsert: (params, req, callback) => {
        var { error } = validations.categoryinsertparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var categoryfind = dbQuaries.findCategoryNamechecking(params);
        categoryfind.then((found) => {
            if (found) {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Already this CategoryName used"
                    }
                })
            } else {
                var checkingsub = params.subcategory[0].subCategoryName;
                var check = checkingsub.trim();
                if (check) {

                    var insertcategoryData = dbQuaries.subCategoryproductinsertparams(params, checkingsub);
                    insertcategoryData.save((inserted) => {
                        if (!inserted) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "Category inserted Successfully"
                                }
                            })
                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "Category inserted Failure"
                                }
                            })
                        }
                    })

                } else {

                    var insertcategoryData = dbQuaries.Categoryproductinsertparams(params);
                    insertcategoryData.save((inserted) => {
                        if (!inserted) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "Category inserted Successfully"
                                }
                            })
                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "Category inserted Failure"
                                }
                            })
                        }
                    })
                }

            }

        })

    }
}
module.exports = insertcategory;