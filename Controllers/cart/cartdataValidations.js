var Joi = require('@hapi/joi');
var cart = {
    cartaddparamsValidations: (params) => {
        var addcart = Joi.object({
            productId: Joi.string().required(),
            mrpPrice:Joi.string().required(),
            mobileNumber: Joi.string().required(),
            quantity: Joi.string().required(),
            netWeight: Joi.string().required(),
            shippingPrice: Joi.string().required(),
            vmartPrice: Joi.string().required(),
        })
        return addcart.validate(params)
    },
    cartupdateDatavalidations: (params) => {
        var updatecartdata = Joi.object({
            mrpPrice:Joi.string().required(),
            mobileNumber: Joi.string().required(),
            quantity: Joi.string().required(),
            netWeight: Joi.string().required(),
            shippingPrice: Joi.string().required(),
            vmartPrice: Joi.string().required(),
            cartId:Joi.string().required(),
        })
        return updatecartdata.validate(params)
    },
    deletecartdatavalidations: (params) => {
        var deletecartData = Joi.object({
            mobileNumber: Joi.string().required(),
            cartId:Joi.string().required()
        })
        return deletecartData.validate(params)
    },
    cartfecthdatavalidations: (params) => {
        var fetchcartDatas = Joi.object({
            mobileNumber: Joi.string().required(),
        })
        return fetchcartDatas.validate(params)
    },
    cartdataDeleteallvalidationsparams: (params) => {
        var deleteallcarts = Joi.object({
            mobileNumber: Joi.string().required(),
        })
        return deleteallcarts.validate(params)
    }
}
module.exports = cart;
