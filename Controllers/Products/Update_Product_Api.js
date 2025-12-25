var Joi = require('@hapi/joi');
var Category_Model = require('../../app/Models/Categories');
var Products_Model = require('../../app/Models/Products_Schema');
var fs = require('fs');

module.exports.Update_Product_Api = async function Update_Product_Api(req, res) {
    try {
        var params = JSON.parse(req.body.productsData);
        var Product_Validation = Joi.object({
            productID: Joi.string().strict().required(),
            productName: Joi.string().strict().required(),
            productDescription: Joi.string().strict().default(""),
            productHighlight: Joi.string().strict().required(),
            categoryID: Joi.string().strict().required().default(""),
            categoryName: Joi.string().strict().required().default(""),
            subCategoryID: Joi.string().strict().required().default(""),
            subCategoryName: Joi.string().strict().required().default(""),
            productPrice: Joi.number().integer().strict().required().default(0),
            disCountProductprice: Joi.number().integer().strict().default(0),
            taxIncludedPrice: Joi.boolean().strict().required().default(false),
            expirationStartDate: Joi.string().strict().required(),
            expirationEndDate: Joi.string().strict().required(),
            // productImagesList: Joi.array(),
            stockQuantity: Joi.number().integer().strict().required().default(0),
            isStockUnlimited: Joi.boolean().strict().required().default(false),
            stockStatus: Joi.string().strict().required(),
            isHighlightedProduct: Joi.boolean().strict().required(),

        })
        var result = await Product_Validation.validate(params);
        if (result.error) {
            return res.status(400).json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_CategoryID = await Category_Model.findOne({
            categoryID: params.categoryID,
            "subCategorys.subCategoryID": params.subCategoryID
        })
        if (Checking_CategoryID) {
            // var checking_productname = await Products_Model.findOne({
            //     categoryID: params.categoryID,
            //     subCategoryID: params.subCategoryID,
            //     productName: params.productName
            // })
            // if (checking_productname) {
            //     return res.json({ response: 0, message: `${params.productName} name is existing product` })
            // }
            var checking_productID = await Products_Model.findOne({ productID: params.productID }).exec();
            if (checking_productID) {
                if (req.files !== null) {
                    //    console.log(req.files)
                    var dbarrayfiles = []
                    if (Array.isArray(req.files.productimages)) {

                        var filesList = req.files.productimages;

                        for (var count = 0; count < filesList.length; count++) {
                            if (filesList[count]) {
                                console.log(filesList[count])
                                var date = new Date().getTime()
                                var file = filesList[count];
                                var filepathServer = "./public/images/productsimages/" + "PID@" + date + file.name;
                                var dbpathfile = "/images/productsimages/" + "PID@" + date + file.name;
                                file.mv(filepathServer, err => {
                                    if (err) {
                                        console.log(err)
                                    }
                                })

                                dbarrayfiles.push(dbpathfile)
                            }
                        }
                    } else {
                        var filesList = req.files.productimages;
                        console.log("fefefefuiefhuuuuuuuuu", filesList)
                        var date = new Date().getTime()
                        var file = filesList;
                        var filepathServer = "./public/images/productsimages/" + "JF@" + date + file.name;
                        var dbpathfile = "/images/productsimages/" + "JF@" + date + file.name;
                        file.mv(filepathServer, err => {
                            if (err) {
                                console.log(err)
                            }
                        })
                        dbarrayfiles.push(dbpathfile)
                    }
                    var insertProductData = await Products_Model.updateOne({
                        
                        productID: params.productID
                    }, {
                        $set: {
                            productName: params.productName,
                            productDescription: params.productDescription,
                            categoryID: params.categoryID,
                            categoryName: params.categoryName,
                            subCategoryID: params.subCategoryID,
                            subCategoryName: params.subCategoryName,
                            productPrice: params.productPrice,
                            disCountProductprice: params.disCountProductprice,
                            taxIncludedPrice: params.taxIncludedPrice,
                            expirationStartDate: params.expirationStartDate,
                            expirationEndDate: params.expirationEndDate,
                            productImagesList: dbarrayfiles,
                            stockQuantity: params.stockQuantity,
                            isStockUnlimited: params.isStockUnlimited,
                            stockStatus: params.stockStatus,
                            isHighlightedProduct: params.isHighlightedProduct,
                            productHighlight:params.productHighlight
                        }
                    })
                    console.log(insertProductData)
                    if (insertProductData.modifiedCount > 0) {
                        var productimages = checking_productID.productImagesList
                        for (var count = 0; count < productimages.length; count++) {
                            if (productimages[count]) {
                                fs.unlink('./public' + productimages[count], (err) => {
                                    if (err) {
                                        console.log("image file unlink failure")
                                    } else {
                                        console.log("image file unlink success")
                                    }
                                })
                            }
                        }
                        return res.json({ respose: 3, message: "Product inserted success" })
                    } else {
                        var productimages = dbarrayfiles
                        for (var count = 0; count < productimages.length; count++) {
                            if (productimages[count]) {
                                fs.unlink('./public' + productimages[count], (err) => {
                                    if (err) {
                                        console.log("image file unlink failure")
                                    } else {
                                        console.log("image file unlink success")
                                    }
                                })
                            }
                        }
                        return res.json({ respose: 0, message: "Product inserted failure" })
                    }
                } else {
                    return res.json({ response: 0, message: "Please pass product images" })
                }
            } else {
                return res.json({ response: 0, message: "ProductID data not found" })
            }


        } else {
            return res.json({ response: 0, message: "CategoryID/SubCategoryID data not found" })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: 0, message: "Internal Server Error", errorDetails: error })
    }
}