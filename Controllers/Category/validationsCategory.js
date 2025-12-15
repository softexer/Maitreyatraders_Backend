var Joi = require('@hapi/joi');
var categorysvalidations = {
    categoryinsertparamsValidations: (params) => {
        var categoryinsert = Joi.object({
            categoryName: Joi.string().required(),
            subcategory: Joi.array().items(Joi.object().keys({
                subCategoryName: Joi.string().optional().allow("")
            }))
        })
        return categoryinsert.validate(params);
    },
    updatecategoryparamsvalidations: (params) => {
        var categoryupdate = Joi.object({
            categoryID: Joi.string().required(),
            subCategoryID: Joi.string().optional()

        });
        return categoryupdate.validate(params)
    },
    subcategoryinsertparamvalidations: (params) => {
        var subcategory = Joi.object({
            categoryID: Joi.string().required(),
            subCategoryName: Joi.string().required()
        })
        return subcategory.validate(params)
    },
    subcategoryparamsvalidations: (params) => {
        var subcategoryupdate = Joi.object({
            categoryID: Joi.string().required(),
            subCategoryName: Joi.string().required(),
            subCategoryID: Joi.string().required()
        })
        return subcategoryupdate.validate(params)
    },
    subcategoryfetchparamsvalidations:(params)=>{
        var subcategoryfetch = Joi.object({
            type:Joi.string().required(),
            PhoneNumber:Joi.string().optional(),
        })
        return subcategoryfetch.validate(params)
    },
    subcategorypulldataparamsvalidations:(params)=>{
        var pulldata = Joi.object({
            subCategoryID:Joi.string().required()
        })
        return pulldata.validate(params)
    },
    deletecategoryparamsValidations:(params)=>{
        var deletecategories = Joi.object({
            type:Joi.string().required()
        })
        return deletecategories.validate(params)
    }
}
module.exports = categorysvalidations;