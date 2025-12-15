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
                    //console.log(req)
                    var catimage = req.files.images;
                    var subcat = req.files.subimage;
                    if ((catimage && subcat) != null) {
                        var IDS = ID.cartID(10)
                        var file = req.files.images;
                        var image = req.files.images.name;
                        var dbpath = '/images/Categoryimages/' + IDS + image;
                        var filemovefolder = './public/images/Categoryimages/' + IDS + image;
                        file.mv(filemovefolder, (err, data) => {
                            if (err) {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "image not move file path"
                                    }
                                })
                            } else {
                                var sIDS = ID.cartID(10)
                                var file1 = req.files.subimage;
                                var subimage = req.files.subimage.name;
                                var subdbpath = '/images/subCategoryimages/' + sIDS + subimage;
                                var filemovefolders = './public/images/subCategoryimages/' + sIDS + subimage;
                                file1.mv(filemovefolders, (err, data) => {
                                    if (err) {
                                        return callback({
                                            status: 200,
                                            data: {
                                                response: 0,
                                                message: "subimage not move file path"
                                            }
                                        })
                                    } else {
                                        var insertcategoryData = dbQuaries.subCategoryproductinsertparams(params, dbpath, subdbpath, checkingsub);
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
                                })
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "please insert categoryimage/subcategory image"
                            }
                        })
                    }
                } else {
                    if (req.files != null) {
                        var IDS = ID.cartID(10)
                        var file = req.files.images;
                        var image = req.files.images.name;
                        var dbpath = '/images/Categoryimages/' + IDS + image;
                        var filemovefolder = './public/images/Categoryimages/' + IDS + image;
                        file.mv(filemovefolder, (err, data) => {
                            if (err) {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "image not move file path"
                                    }
                                })
                            } else {
                                console.log(image)
                                var insertcategoryData = dbQuaries.Categoryproductinsertparams(params, dbpath);
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
                        })

                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "image not inserted"
                            }
                        })
                    }
                }
            }

        })

    }
}
module.exports = insertcategory;