var validations = require('./validationsCategory');
var dbQuaries = require('./categorydbQuaries');
var Category_Model = require('../../app/Models/Categories')
var catId = require('../Core/cartID');
var fs = require('fs');
var path = require('path');
var Products = require('../../app/Models/Products_Schema')

var subcategory = {
    subcategoryinsert: (params, req, callback) => {
        var { error } = validations.subcategoryinsertparamvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }

        var categorydata = dbQuaries.datacategoryIDfetchparams(params);
        categorydata.then(async (found) => {
            if (found) {
                for (var a = 0; a < found.subCategorys.length; a++) {
                    if (found.subCategorys[a].subCategoryName === params.subCategoryName) {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Already used subCategoryName"
                            }
                        })
                    }
                }
                var checkingSubCategoryName = await Category_Model.findOne({
                    categoryID: params.categoryID,
                    "subCategorys.subCategoryID": { $ne: params.subCategoryID },
                    "subCategorys.subCategoryName": params.subCategoryName
                })
                if (checkingSubCategoryName) {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "Already used subCategoryName"
                        }
                    })
                }
                var date = new Date().getTime();
                var subcategoryIDGenerate = "subCID" + catId.cartID(7) + "@" + date;
                var updatedata = dbQuaries.categoryinpushsubCategorydataparams(params, subcategoryIDGenerate);

                updatedata.then((updated) => {

                    if (updated.modifiedCount > 0) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "subCategory inserted Successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "subCategory inserted Failure"
                            }
                        })
                    }
                })

            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "CategoryID Data Not found Data Base"
                    }
                })
            }
        })

    },
    subcategoryupdate: (params, req, callback) => {
        var { error } = validations.subcategoryparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var categorydata = dbQuaries.categoryandsubcategorydatafetchparams(params);
        categorydata.then((founded) => {

            if (founded) {
                var checkingSubCategoryName = founded.subCategorys[0].subCategoryName;
                if (checkingSubCategoryName === params.subCategoryName) {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "Already used this subCategoryName"
                        }
                    })
                }
                var updatedatainsubcategory = dbQuaries.updateinsubcategorydataparams(params);
                updatedatainsubcategory.then((updated) => {
                    if (updated.modifiedCount > 0) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "subCategoryName updated Successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "subCategoryName updated Failure"
                            }
                        })
                    }
                })

            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "subCategoryID Data base not found"
                    }
                })
            }
        })
    },
    subcategoryfetch: (params, callback) => {
        var { error } = validations.subcategoryfetchparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        if (params.type === "All") {
            var dailyproducts = dbQuaries.dailyproductsfetchdataparams(params);
            dailyproducts.then((fetched) => {
                var bestsellsproducts = dbQuaries.bestsellesProductsdataparams(params);
                bestsellsproducts.then((getdata) => {
                    console.log(getdata)
                    var mk = [];
                    for (var a = 0; a < getdata.length; a++) {
                        if (getdata[a]._id) {
                            mk.push(getdata[a]._id)
                        }
                    }
                    var datacheckingsmim = dbQuaries.minidatafechingparams(mk);
                    datacheckingsmim.then((founds) => {
                        var datacard = dbQuaries.findcartdata(params);
                        datacard.then((getdatas) => {
                            if (getdatas.length > 0) {
                                for (var a = 0; a < getdatas.length; a++) {
                                    for (var b = 0; b < founds.length; b++) {
                                        if (getdatas[a].ProductID === founds[b].ProductID) {
                                            founds[b].customerQuantity = getdatas[a].quantity;
                                            founds[b].VMART_Price = getdatas[a].vmartPrice;
                                            founds[b].MRP_Price = getdatas[a].mrpPrice;
                                        }
                                    }
                                }
                            }
                            var dashboardfetchData = dbQuaries.datafetchalldashBoardparams(params);
                            dashboardfetchData.then((founded) => {
                                var categorydatafetch = dbQuaries.fetchallcategoriesdataparams(params);
                                categorydatafetch.then((found) => {
                                    if (found.length > 0) {
                                        return callback({
                                            status: 200,
                                            data: {
                                                response: 3,
                                                message: "Data found Successfully",
                                                CategoryInfo: found,
                                                DashBoardData: founded,
                                                DailyDeals: fetched,
                                                bestSellings: founds
                                            }
                                        })
                                    } else {
                                        return callback({
                                            status: 200,
                                            data: {
                                                response: 0,
                                                message: "Data not found",
                                                CategoryInfo: found,
                                                DashBoardData: founded,
                                                DailyDeals: fetched,
                                                bestSellings: founds
                                            }
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
            })
        } else {
            var categorydatafetch = dbQuaries.fetchallcategoriesdataparams(params);
            categorydatafetch.then((found) => {
                if (found.length > 0) {
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Data found Successfully",
                            CategoryInfo: found
                        }
                    })
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "Data not found",
                            CategoryInfo: found

                        }
                    })
                }
            })
        }

    },
    subcategorypulldata: (params, callback) => {
        var { error } = validations.subcategorypulldataparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }

        var fetchdatasubcategoryID = dbQuaries.fetchdatasubcategoryIDparams(params);
        fetchdatasubcategoryID.then((found) => {
            if (found) {
                var pulldatasubcategory = dbQuaries.pulldatasubcategoryparams(params);
                pulldatasubcategory.then(async (updated) => {
                    if (updated.modifiedCount > 0) {
                        var ProductGetData = await Products.find({ subCategoryID: params.subCategoryID }, { _id: 0, __v: 0 });
                        var deleteProducts = await Products.deleteMany({ subCategoryID: params.subCategoryID }).exec();
                        if (ProductGetData.length > 0) {
                            for (var a = 0; a < ProductGetData.length; a++) {
                                var deleteImagePaths = [];
                                for (var b = 0; b < ProductGetData[a].productImagesList.length; b++) {
                                    var imagepath = './public' + ProductGetData[a].productImagesList[b];
                                    fs.unlink(imagepath, (err) => {
                                        if (err) {
                                            console.log("err", err)
                                        } else {
                                            console.log("file unlinked successfully")
                                        }
                                    })
                                }
                            }
                        }
                        var dbpathimage = found.subCategorys[0].SubCategoryProfilePic;
                        var removeimageinpath = "./public" + dbpathimage;
                        fs.unlink(removeimageinpath, (err) => {
                            if (err) {
                                console.log("err", err)
                            } else {
                                console.log("File deleted successfully")
                            }
                        })
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "subCategory deleted Successfully"

                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "subCategory deleted Failure"

                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "No Data found"

                    }
                })
            }
        })

    },
    categoriesDelete: async (params, callback) => {
        try {
            var Joi = require('@hapi/joi');
            var { error } = validations.deletecategoryparamsValidations(params);
            if (error) {
                return callback({
                    status: 400,
                    data: {
                        response: 0,
                        message: error.details[0].message
                    }
                })
            }
            var Checking_Data = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();
            if (Checking_Data) {
                var categorydata = await Category_Model.findOne({ categoryID: params.categoryID }).exec();
                if (!categorydata) {
                    return callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "CategoryID Data not found"
                        }
                    })
                } else {
                    var deletecategory = await Category_Model.deleteOne({ categoryID: params.categoryID }).exec();
                    var Productsfetch = await Products.find({ categoryID: params.categoryID }).exec();
                    if (deletecategory.deletedCount > 0) {
                        var productsdelete = await Products.deleteMany({ categoryID: params.categoryID }).exec();
                        for (var a = 0; a < categorydata.subCategorys.length; a++) {
                            var dbpathimage = categorydata.subCategorys[a].SubCategoryProfilePic;
                            var removeimageinpath = "./public" + dbpathimage;
                            fs.unlink(removeimageinpath, (err) => {
                                if (err) {
                                    console.log("err", err)
                                } else {
                                    console.log("File deleted successfully")
                                }
                            })
                        }
                        //products delete
                        if (Productsfetch.length > 0) {
                            for (var b = 0; b < Productsfetch.length; b++) {
                                for (var c = 0; c < Productsfetch[b].productImagesList.length; c++) {
                                    var productimagepath = "./public" + Productsfetch[b].productImagesList[c];
                                    fs.unlink(productimagepath, (err) => {
                                        if (err) {
                                            console.log("err", err)
                                        } else {
                                            console.log("File deleted successfully")
                                        }
                                    })
                                }
                            }
                        }
                        // delete category image
                        var categoryimagepath = "./public" + categorydata.CategoryImage;
                        fs.unlink(categoryimagepath, (err) => {
                            if (err) {
                                console.log("err", err)
                            } else {
                                console.log("File deleted successfully")
                            }
                        })
                    }
                }
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "adminuniqueID Data not found"
                    }
                })
            }

        } catch (error) {
            return callback({
                status: 500,
                data: {
                    response: 0,
                    message: "Internal Server Error"
                }
            })
        }

    }

}
module.exports = subcategory;