var Admin_Model = require('../../app/Models/Admin');
var AdvertisementModel = require('../../app/Models/Advertisement_Model');
var { insertadvertisementValidations } = require('./validationAdvertisement');
var RandomGenerate_password = require('generate-password');
var path = require('path')
module.exports = {
    insertadvertisement: async (req, res) => {
        try {
            var params = JSON.parse(req.body.advertisementData);
            var result = insertadvertisementValidations.validate(params);
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
                        var filename = file.name;
                        var date = new Date();
                        var randomid = RandomGenerate_password.generate({
                            length: 5,
                            lowercase: true,
                            uppercase: true,
                            symbols: false,
                            numbers: true,
                            excludeSimilarCharacters: true

                        })
                        var id = date.getFullYear() + "" + date.getMonth() + "" + date.getDay() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getMilliseconds();
                        var uniqueid = date.getFullYear() + "" + date.getMonth() + "" + date.getDay() + "" + date.getHours() + "" + date.getMinutes();
                        var wegetextname = path.extname(file.name)
                        var filepath = './public/images/Advertisements/' + "AD@" + id + randomid + "m" + wegetextname;
                        var dbpath = '/images/Advertisements/' + "AD@" + id + randomid + "m" + wegetextname;
                        file.mv(filepath, async (err) => {
                            if (err) {
                                return res.json({ response: 0, message: "FileUpload something went to wrong" })
                            } else {
                                var insertAdvertisement = await AdvertisementModel.insertMany([{
                                    advertisementID: "ADID@" + uniqueid + randomid,
                                    adminuniqueID: params.adminuniqueID,
                                    image: dbpath,
                                    timestamp: new Date().getTime().toString(),


                                }])
                                if (insertAdvertisement.length > 0) {
                                    return res.json({ response: 3, message: "Advertisement added success" })
                                } else {
                                    return res.json({ response: 0, message: "Advertisement added failure" })
                                }
                            }
                        })
                    } else {


                        return res.json({ response: 0, message: "Please pass correct image key" })
                    }
                } else {
                    return res.json({ response: 0, message: "Please upload file " })
                }
            } else {
                return res.json({ response: 0, message: "adminuniqueID data not found" })
            }
        } catch (error) {
            return res.json({ response: 0, message: "try catch error" + " " + error.message })
        }
    }
}
