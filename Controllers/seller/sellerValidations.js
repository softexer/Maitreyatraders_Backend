var Joi = require('@hapi/joi')
var sellervalidations = {
    SellerRegisterparamsvalidations: (params) => {
        var Registerseller = Joi.object({
            Name: Joi.string().required(),
            userID: Joi.string().required(),
            PhoneNumber: Joi.string().required(),
            BankName: Joi.string().required(),
            AccountNumber: Joi.string().required(),
            IFSCCode: Joi.string().required(),
            AccountName: Joi.string().required(),
            Password: Joi.string().required(),

        })
        return Registerseller.validate(params)
    },
    loginvalidations: (params) => {
        var login = Joi.object({
            userID: Joi.string().required(),
            Password: Joi.string().required(),
        })
        return login.validate(params)
    },
    SellerUpdatePasswordvalidations: (params) => {
        var passwordupdate = Joi.object({
            userID: Joi.string().required(),
            Password: Joi.string().required(),
        })
        return passwordupdate.validate(params)
    },
    fetchsellerdata: (params) => {
        var fetch = Joi.object({
            PhoneNumber: Joi.string().required()
        })
        return fetch.validate(params)
    },
    totalordersparamsvalidations:(params)=>{
        var totalorders = Joi.object({
            type:Joi.string().required()
        })
        return totalorders.validate(params)
    },
    ordersconformparamsvalidations:(params)=>{
        var Conformorders = Joi.object({
            PhoneNumber:Joi.string().required(),
            orderId:Joi.string().required(),
            orderstatus:Joi.string().required()

        })
        return Conformorders.validate(params)
    }
}
module.exports = sellervalidations;