var Joi = require('@hapi/joi');
var contactusvalidations = {
    insertContactusvalidations: (params) => {
        var insert = Joi.object({
            name: Joi.string().required(),
            emailAddress: Joi.string().required(),
            Message: Joi.string().required(),
            merchantId: Joi.string().required(),
            userId: Joi.string().required(),
        })
        return insert.validate(params)
    }
}
module.exports = contactusvalidations