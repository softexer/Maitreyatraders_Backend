var Admin_Model = require('../../app/Models/Admin');
var AdvertisementModel = require('../../app/Models/Advertisement_Model');
var { deletevertisementValidations } = require('./validationAdvertisement');
var RandomGenerate_password = require('generate-password');
var path = require('path');
var fs = require('fs');

module.exports = {
    deleteadvertisement: async (req, res) => {
        try {
            var params = req.body
            var result = await deletevertisementValidations.validate(params);
            if (result.error) {
                res.statusCode = 400;
                return res.json({ response: 0, message: result.error.details[0].message })
            }
            var CheckingCurrentAdmin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();
            if (CheckingCurrentAdmin) {
                var Advertisementdataget = await AdvertisementModel.findOne({
                    adminuniqueID: params.adminuniqueID,
                    advertisementID: params.advertisementID
                }).exec();
                if (Advertisementdataget) {
                    var Advertisementdelete = await AdvertisementModel.deleteOne({
                        adminuniqueID: params.adminuniqueID,
                        advertisementID: params.advertisementID
                    }).exec();
                    if (Advertisementdelete.deletedCount > 0) {
                        fs.unlinkSync('./public' + Advertisementdataget.image);
                        return res.json({ response: 3, message: "Advertisement data deleted successfully" })
                    } else {
                        return res.json({ response: 0, message: "Advertisement data deleted failure" })
                    }
                } else {
                    return res.json({ response: 0, message: "AdvertisementID data not found" })
                }
            } else {
                return res.json({ response: 0, message: "adminuniqueID data not found" })
            }
        } catch (error) {
            return res.json({ response: 0, message: "try catch error" + " " + error.message })
        }
    }
}
