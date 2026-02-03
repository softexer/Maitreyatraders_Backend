module.exports.Admin_Fetch_Api = async function Admin_Fetch_Api(req, res) {
    try {
        var Joi = require('@hapi/joi');
        var Admin_Model = require('../../app/Models/Admin');
        var params = req.body;
        var AdminFetchValidate = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
        })
        var result = await AdminFetchValidate.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }, { password: 0, __v: 0, _id: 0 });
        if (Checking_Admin) {
            return res.json({ response: 3, message: "Admin data fetched successfully", AdminData: Checking_Admin })
        } else {
            return res.json({ response: 0, message: "adminuniqueID data not found" })
        }

    } catch (error) {
        console.log("Admin_Fetch_Api error", error)
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}