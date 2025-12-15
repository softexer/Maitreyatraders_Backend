var Joi = require('@hapi/joi');
var dashvalidates = {
    dashboardinsertparamsValidations: (params) => {
        var insertvalidates = Joi.object({
            PhoneNumber: Joi.string().required(),
            CategoryName: Joi.string().required(),
            subcategoryName: Joi.string().required(),
            type: Joi.string().required()
        })
        return insertvalidates.validate(params)
    },
    dashboardupdateparamsValidations: (params) => {
        var update = Joi.object({
            PhoneNumber: Joi.string().required(),
            type: Joi.string().required(),
            Id: Joi.string().required()
        })
        return update.validate(params)
    },
    dashboarddeleteinsertDataparamsValidations: (params) => {
        var deletedata = Joi.object({
            PhoneNumber: Joi.string().required(),
            type: Joi.string().required(),
            Id: Joi.string().required()
        })
        return deletedata.validate(params)
    }
}
module.exports = dashvalidates