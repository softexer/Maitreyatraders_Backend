var Admin_Model = require('../../app/Models/Admin');
var AdvertisementModel = require('../../app/Models/Advertisement_Model');
var { updateadvertisementValidations } = require('./validationAdvertisement');
var RandomGenerate_password = require('generate-password');
var path = require('path');
var fs = require('fs');
module.exports = {
    updateadvertisement: async (req, res) => {
        try {
            var params = JSON.parse(req.body.advertisementData);
            var result = await updateadvertisementValidations.validate(params);
            if (result.error) {
                res.statusCode = 400;
                return res.json({ response: 0, message: result.error.details[0].message })
            }

            var CheckingCurrentAdmin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();

            if (CheckingCurrentAdmin) {

                if (req.files != null) {

                    var keysdata = Object.keys(req.files);
                    if (keysdata.includes("AdvertisementImage")) {
                        var file = req.files.AdvertisementImage;
                        var checkingadvertisementid = await AdvertisementModel.findOne({
                            // adminuniqueID: params.adminuniqueID,
                            advertisementID: params.advertisementID
                        }).exec();
                        if (checkingadvertisementid) {
                            var imagesget = checkingadvertisementid.image;
                            var imagesname = path.basename(imagesget)
                            var filepath = './public/images/Advertisements/' + imagesname;
                            var dbpath = '/images/Advertisements/' + imagesname;
                            file.mv(filepath, async (err) => {
                                if (err) {
                                    return res.json({ response: 0, message: "FileUpload something went to wrong" })
                                } else {
                                    var updateAdvertisement = await AdvertisementModel.updateOne({
                                        advertisementID: params.advertisementID,
                                        // adminuniqueID: params.adminuniqueID,
                                    }, {
                                        $set: {
                                            image: dbpath,
                                            categoryID: params.categoryID,
                                            subCategoryID: params.subCategoryID,
                                            productID: params.productID,
                                            title: params.title,
                                            description: params.description,
                                            timestamp: new Date().getTime().toString(),
                                        }
                                    }
                                    )
                                    if (updateAdvertisement.modifiedCount > 0) {
                                        return res.json({ response: 3, message: "Advertisement updated success" })
                                    } else {
                                        return res.json({ response: 0, message: "Advertisement updated failure" })
                                    }
                                }
                            })
                        } else {
                            return res.json({ response: 0, message: "AdvertisementID data not found" })
                        }

                    } else {


                        return res.json({ response: 0, message: "Please pass correct image key" })
                    }
                } else {
                    return res.json({ response: 0, message: 'Please pass image' })
                }
            } else {
                return res.json({ response: 0, message: "adminuniqueID data not found" })
            }
        } catch (error) {
            return res.json({ response: 0, message: "try catch error" + " " + error.message })
        }
    }
}
