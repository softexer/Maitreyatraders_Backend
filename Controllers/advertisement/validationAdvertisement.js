var Joi = require('@hapi/joi');
module.exports ={
    insertadvertisementValidations:Joi.object({
        adminuniqueID:Joi.string().strict().required(),
        categoryID:Joi.string().strict().required(),
        subCategoryID:Joi.string().strict().required(),
        productID:Joi.string().strict().required(),
        title:Joi.string().strict().required(),
        description:Joi.string().strict().required(),

    }),
    updateadvertisementValidations:Joi.object({
        adminuniqueID:Joi.string().strict().required(),
        advertisementID:Joi.string().strict().required(),
        categoryID:Joi.string().strict().required(),
        subCategoryID:Joi.string().strict().required(),
        productID:Joi.string().strict().required(),
        title:Joi.string().strict().required(),
        description:Joi.string().strict().required(),
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