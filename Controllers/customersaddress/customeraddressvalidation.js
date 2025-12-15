var Joi = require('@hapi/joi')
var addresscustomers = {
    addcustomerDataparamsvalidations: (params) => {
        var add = Joi.object({
            pinCode: Joi.string().required(),
            address: Joi.string().required(),
            name: Joi.string().required(),
            state: Joi.string().required(),
            mobile: Joi.string().required(),
            city: Joi.string().required(),
            area: Joi.string().required(),
            landmark: Joi.string().required(),
            userId: Joi.string().required(),
            favourite: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            timeStamp: Joi.string().required()
        });
        return add.validate(params)
    },
    customeraddressupdateparamsvalidations:(params)=>{
        var update =Joi.object({
            pinCode: Joi.string().required(),
            address: Joi.string().required(),
            name: Joi.string().required(),
            state: Joi.string().required(),
            mobile: Joi.string().required(),
            city: Joi.string().required(),
            area: Joi.string().required(),
            landmark: Joi.string().required(),
            userId: Joi.string().required(),
            favourite: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            timeStamp: Joi.string().required(),
            addressID:Joi.string().required(),
        })
        return update.validate(params)
    },
    fetchCustomeraddressparamsValidations:(params)=>{
        var fetch = Joi.object({
            mobile:Joi.string().required()
        })
        return fetch.validate(params);
    },
    useraddressdeleteDatavalidations:(params)=>{
        var deletes = Joi.object({
            addressID:Joi.string().required(),
        })
        return deletes.validate(params)
    },
    defaultsaddressvalidationparams:(params)=>{
        var defalutsadd = Joi.object({
            addressID:Joi.string().required(),
            mobile:Joi.string().required()
        })
        return defalutsadd.validate(params)
    }
}
module.exports = addresscustomers