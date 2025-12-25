var Joi = require('@hapi/joi');
var Admin_Model = require('../../app/Models/Admin');
var bcrypt = require('bcryptjs')
module.exports.Admin_Changed_Password_Api = async function Admin_Changed_Password_Api(req, res) {
    try {
        var params = req.body;
        var Validate_Admin = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            oldpassword: Joi.string().strict().required(),
            password: Joi.string().strict().required()
            //https://api.softexer.com/api/hire/getBookings
        })

        var result = await Validate_Admin.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin_userID = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();
        if (!Checking_Admin_userID) {
            return res.json({ response: 0, message: "EmailID data not found" })
        } else {
            var passwardcompare = bcrypt.compareSync(params.oldpassword, Checking_Admin_userID.password)
            console.log(passwardcompare)
            if (!passwardcompare) {
                return res.json({ response: 0, message: "Old password is wrong" })
            }
            var Genpass = bcrypt.hashSync(params.password, 10);
            var update_password = await Admin_Model.updateOne({
                adminuniqueID: params.adminuniqueID
            }, {
                $set: {
                    password: Genpass
                }
            })
            if (update_password.modifiedCount > 0) {
                return res.json({ response: 3, message: "Password updated successfully" })
            } else {
                return res.json({ response: 0, message: "Password updated failure" })
            }
        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}