var Admin_Model = require('../../app/Models/Admin');
var AdvertisementModel = require('../../app/Models/Advertisement_Model');
var { fetchadvertisementValidations } = require('./validationAdvertisement');
var RandomGenerate_password = require('generate-password');
var path = require('path')
module.exports = {
    fetchadvertisement: async (req, res) => {
        try {
            var params = req.body
            var result = await fetchadvertisementValidations.validate(params);
            if (result.error) {
                res.statusCode = 400;
                return res.json({ response: 0, message: result.error.details[0].message })
            }
            var CheckingCurrentAdmin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();
            if (CheckingCurrentAdmin) {
                if(params.advertisementID =="All"){
                    var Advertisementdataget = await AdvertisementModel.find({}).exec();
                    if (Advertisementdataget.length > 0) {
                        return res.json({ response: 3, message: "Advertisement data founded successfully",AdvertisementData:Advertisementdataget })
                    } else {
                        return res.json({ response: 0, message: "Advertisement data not found" })
                    }
                }else{
                    var Advertisementdataget = await AdvertisementModel.find({advertisementID:params.advertisementID}).exec();
                    if (Advertisementdataget.length > 0) {
                        return res.json({ response: 3, message: "Advertisement data founded successfully",AdvertisementData:Advertisementdataget })
                    } else {
                        return res.json({ response: 0, message: "Advertisement data not found" })
                    }
                }
                
            } else {
                return res.json({ response: 0, message: "userID data not found" })
            }
        } catch (error) {
            return res.json({ response: 0, message: "try catch error" + " " + error.message })
        }
    }
}
