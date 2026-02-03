var Joi = require('@hapi/joi');
module.exports ={
    insertadvertisementValidations:Joi.object({
        adminuniqueID:Joi.string().strict().required()
    }),
    updateadvertisementValidations:Joi.object({
        adminuniqueID:Joi.string().strict().required(),
        advertisementID:Joi.string().strict().required(),
    }),
    fetchadvertisementValidations:Joi.object({
        adminuniqueID:Joi.string().strict().required(),
        advertisementID:Joi.string().strict().required(),
    }),
    deletevertisementValidations:Joi.object({
        adminuniqueID:Joi.string().strict().required(),
        advertisementID:Joi.string().strict().required(),
    }),
}