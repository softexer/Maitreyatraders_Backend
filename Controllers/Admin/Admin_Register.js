var Joi = require('@hapi/joi');
var Admin_Model = require('../../app/Models/Admin');
var bcrypt = require('bcryptjs')
module.exports.Admin_Signup_Api = async function Admin_Signup_Api(req, res) {
    try {
        var params = req.body;
        var Validate_Admin = Joi.object({
            emailID: Joi.string().strict().required(),
            password: Joi.string().strict().required()
            //https://api.softexer.com/api/hire/getBookings
        })

        var result = await Validate_Admin.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin_userID = await Admin_Model.findOne({emailID: params.emailID}).exec();
        if (Checking_Admin_userID) {
            return res.json({ response: 0, message: "Already Admin singup" })
        } else {
            var passwordGen = bcrypt.hashSync(params.password, 10)
            var Admin_Register = await Admin_Model.insertMany([{
                emailID: params.emailID,
                password: passwordGen
            }])
            if (Admin_Register.length > 0) {
                return res.json({ response: 3, message: "Admin Signup successfully completed" })
            } else {
                return res.json({ response: 0, message: "Admin Signup faillure" })
            }

        }

    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}