var validations = require('./validationsCategory');
var dbQuaries = require('./categorydbQuaries');

var ID = require('../Core/cartID')
var fs = require('fs');
var path = require('path')
var updateCT = {
    categoryupdate: (params, req, callback) => {
        const { error } = validations.updatecategoryparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        if (params.categoryID && params.subCategoryID) {
            var categorydata = dbQuaries.datacategoryIDfetchparams(params);
            categorydata.then((found) => {
                if (found) {
                    if (req.files != null) {
                        var ctimg = req.files.images;
                        var subct = req.files.subimage;
                        if (ctimg && subct) {
                            var subimg;
                            for (var a = 0; a < found.subCategorys.length; a++) {
                                if (params.subCategoryID == found.subCategorys[a].subCategoryID) {
                                    subimg = found.subCategorys[a].SubCategoryProfilePic
                                }
                            }
                            var categoryimagefound = found.CategoryImage;
                            var subcategoryimagefound = subimg;
                            var categoryimagepath = path.basename(categoryimagefound);
                            var subcategoryimagepath = path.basename(subcategoryimagefound);
                            var file = ctimg;
                            var files = subct;
                            var ci = ctimg.name;
                            var subci = subct.name;
                            var imagecatgory = ci.replace(ci, categoryimagepath);
                            var subimagecatgory = subci.replace(subci, subcategoryimagepath);
                            var upcatimg = "./public/images/Categoryimages/" + imagecatgory;
                            var subupcatimg = "./public/images/subCategoryimages/" + subimagecatgory;
                            var dbupcatimg = "/images/Categoryimages/" + imagecatgory;
                            var dbsubupcatimg = "/images/subCategoryimages/" + subimagecatgory;
                            file.mv(upcatimg, (err) => {
                                if (err) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "Please pass categoryimage"
                                        }
                                    })
                                } else {
                                    files.mv(subupcatimg, (err) => {
                                        if (err) {
                                            return callback({
                                                status: 200,
                                                data: {
                                                    response: 0,
                                                    message: "Please pass subcategoryimage"
                                                }
                                            })
                                        } else {
                                            var updatedimagesanddata = dbQuaries.updatedimagesandsubimagesdata(params, dbupcatimg, dbsubupcatimg);
                                            updatedimagesanddata.then((updated) => {
                                                if (updated.modifiedCount > 0) {
                                                    return callback({
                                                        status: 200,
                                                        data: {
                                                            response: 0,
                                                            message: "Categories updated Successfully"
                                                        }
                                                    })
                                                } else {
                                                    return callback({
                                                        status: 200,
                                                        data: {
                                                            response: 0,
                                                            message: "Categories updated failure"
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
                                    message: "Please pass images categoryimage/subcategoryimage"
                                }
                            })
                        }

                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Please pass images categoryimage/subcategoryimage"
                            }
                        })
                    }



                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "No data Found this CategoryID"
                        }
                    })
                }
            })
        } else {
            var categorydata = dbQuaries.datacategoryIDfetchparams(params);
            categorydata.then((found) => {
                if (found) {
                    var file = req.files.images;
                    var pathcategory = req.files.images.name;
                    var dbcategorypath = found.CategoryImage;
                    var dbcatpath = path.basename(dbcategorypath);
                    var ctpath = pathcategory.replace(pathcategory, dbcatpath);
                    var movetofolder = './public/images/Categoryimages/' + ctpath;
                    var dbpathupdate = '/images/Categoryimages/' + ctpath;
                    file.mv(movetofolder, (err) => {
                        if (err) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "Category image not mv file path"
                                }
                            })
                        } else {
                            var updateimagesdata = dbQuaries.categoryimageupdateparams(params,dbpathupdate);
                            updateimagesdata.then((updated) => {
                                console.log(updated)
                                if (updated) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 3,
                                            message: "category data updated successfully"
                                        }
                                    })
                                } else {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "category data updated Failure"
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
                            message: "No data Found this CategoryID"
                        }
                    })
                }
            })
        }
    }
}
module.exports = updateCT;