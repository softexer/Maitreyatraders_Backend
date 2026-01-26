var Joi = require('@hapi/joi');
var Customer_Model = require('../../app/Models/customer')
module.exports.Customer_Login = async function Customer_Login(req, res) {
    try {
        var params = req.body;
        var Customer_Login_Validation = Joi.object({
            userID: Joi.string().strict().required()
        })
        var result = await Customer_Login_Validation.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_UserID = await Customer_Model.find({ userID: params.userID }, { userID: 1, _id: 0 }).exec();
        if (Checking_UserID) {
            return res.json({ response: 3, message: "customer login successfully", CustomerData: { userID: params.userID } })
        } else {
            var RegisterCustomer = await Customer_Model.insertMany([{ userID: params.userID }]);
            if (RegisterCustomer.length > 0) {
                return res.json({ response: 3, message: "customer login successfully", CustomerData: { userID: params.userID } })
            }

        }

    } catch (error) {
        console.log(error.message)
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}