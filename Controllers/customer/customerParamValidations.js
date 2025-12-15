var Joi = require('@hapi/joi')
var Customervalidationsparams = {
    validateGetTokenPaymentsParams : (params) =>{
        const Schema = Joi.object({
            PhoneNumber : Joi.string().required(),
            userAddress : Joi.string().required(),
            orderAmount : Joi.string().required(),
            paymentMode : Joi.string().required(),
            paymentType : Joi.string().required(),
	        channelId:Joi.string().required(),
            orderId:Joi.string().required()  ,
            callbackUrl: Joi.string().optional().allow()      
        });
        return Schema.validate(params);
    },
    Registervalidation: (params) => {
        var registerCons = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            userID: Joi.string().email({ minDomainSegments: 2 }).required(),
            PhoneNumber: Joi.string().required(),
            Password: Joi.string().required(),

        })
        return registerCons.validate(params)
    },
    loginvalidateParams: (params) => {
        var login = Joi.object({
            PhoneNumber: Joi.string().required(),
            otpNumber: Joi.string().required(),
            deviceId: Joi.string().required(),
            tokenId: Joi.string().required(),
            deviceType: Joi.string().required(),
        })
        return login.validate(params)
    },
    signupvalidations: (params) => {
        var signup = Joi.object({
            PhoneNumber: Joi.string().required(),
            //merchantId: Joi.string().required()
        })
        return signup.validate(params)
    },
    validateUserLogoutParameters:(params)=>{
        const logoutSchema = Joi.object({
            PhoneNumber: Joi.string().required(),
            deviceId: Joi.string().optional().allow(''),
            tokenId: Joi.string().optional().allow(''),
            deviceType: Joi.string().required()
        })

        return logoutSchema.validate(params);
    },
}
module.exports = Customervalidationsparams;