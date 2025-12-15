var Joi = require('@hapi/joi');
var productsvalidates = {
    insertProductsparamsvalidations: (params) => {
        var insertProducts = Joi.object({
            subCategoryID: Joi.string().required(),
            CategoryID: Joi.string().required(),
            ProductName: Joi.string().required(),
            Brand: Joi.string().required(),
            MRP_Price: Joi.number().required(),
            VMART_Price: Joi.number().required(),
            Netweight:Joi.string().required(),
            quantity: Joi.string().required(),
            description: Joi.string().required(),

        })
        return insertProducts.validate(params)
    },
    updateProductsparamsvalidations:(params)=>{
        var updateproducts = Joi.object({
            ProductID:Joi.string().required(),
            ProductName: Joi.string().required(),
            Brand: Joi.string().required(),
            MRP_Price: Joi.number().required(),
            VMART_Price: Joi.number().required(),
            quantity: Joi.string().required(),
            Netweight:Joi.string().required(),
            description: Joi.string().required(),
            Product_Status:Joi.boolean().required()
        })
        return updateproducts.validate(params)
    },
    fetchProductsparamsvalidations:(params)=>{
        var fetchdataproducts = Joi.object({
            type:Joi.string().required(),
            PhoneNumber:Joi.string().optional()
        })
        return fetchdataproducts.validate(params)
    },
    deleteProductsparamsvalidations:(params)=>{
        var deleteproducts = Joi.object({
            type:Joi.string().required()
        })
        return deleteproducts.validate(params)
    },
    searchdatavalidationparams:(params)=>{
        var search = Joi.object({
            type:Joi.string().required()
        })
        return search.validate(params)
    }
}
module.exports = productsvalidates;