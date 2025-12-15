var validations = require('./validationProducts');
var dbQuaries = require('./dbQuariesProducts');

var path = require('path');
var fs = require('fs')
var productupdate = {
    productupdate: (params, req, callback) => {
        const { error } = validations.updateProductsparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingID = dbQuaries.fetchProductIDdataparams(params);
        checkingID.then((found) => {
            if (found) {
                var productimagefound = found.ProductImage;
                if (req.files != null) {
                    var productimagebasename = path.basename(productimagefound);
                    var file = req.files.productimage;
                    var filename = req.files.productimage.name;
                    var replacebasename = filename.replace(filename, productimagebasename);
                    var filemvpaths = './public/images/productsimages/' + replacebasename;
                    var filedbpath = '/images/productsimages/' + replacebasename;
                    file.mv(filemvpaths, (err) => {
                        if (err) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "something went to wrong"
                                }
                            })
                        } else {
                            var updateproductsdata = dbQuaries.updateproductsdataparams(params, filedbpath);
                            updateproductsdata.then((updated) => {
                                if (updated) {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 3,
                                            message: "productData updated successfully"
                                        }
                                    })
                                } else {
                                    return callback({
                                        status: 200,
                                        data: {
                                            response: 0,
                                            message: "productData updated failure"
                                        }
                                    })
                                }
                            })
                        }
                    })

                } else {
                    var updateproductsdata = dbQuaries.updateproductsdataparams(params, productimagefound);
                    updateproductsdata.then((updated) => {
                        if (updated) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "productData updated successfully"
                                }
                            })
                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "productData updated failure"
                                }
                            })
                        }
                    })
                }
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "ProductID Database not found"
                    }
                })
            }
        })
    }
}
module.exports = productupdate;