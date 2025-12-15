var Joi = require('@hapi/joi')
var whishlistvalidate = {
    insertwhishlistValidations: (params) => {
        var insertdata = Joi.object({
            PhoneNumber: Joi.string().required(),
            ProductID: Joi.string().required()
        })
        return insertdata.validate(params)
    },
    fetchwhishlistvalidations: (params) => {
        var fetchdata = Joi.object({
            PhoneNumber: Joi.string().required()
        })
        return fetchdata.validate(params)
    },
    deletewhishlistvalidations: (params) => {
        var deletedata = Joi.object({
            PhoneNumber: Joi.string().required(),
            ProductID: Joi.string().required()
        })
        return deletedata.validate(params)
    }
}
module.exports = whishlistvalidate;