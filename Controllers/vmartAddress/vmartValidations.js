var Joi = require('@hapi/joi');
var vmartAddress = {
    insertVmartAddressValidations: (params) => {
        var Vmartaddressinsert = Joi.object({
            address: Joi.string().required(),
            landmark: Joi.string().required(),
            area: Joi.string().required(),
            city: Joi.string().required(),
            pincode: Joi.string().required(),
            latitude: Joi.string().required(),
            langitude: Joi.string().required()

        })
        return Vmartaddressinsert.validate(params)
    },
    // fetchVmartaddressvalidations:(params)=>{
    //     var fetchVmartaddress = Joi.object({

    //     })
    // },
    updatevmartaddressvalidations:(params)=>{
        var updatevmartaddress = Joi.object({
            address: Joi.string().required(),
            landmark: Joi.string().required(),
            area: Joi.string().required(),
            city: Joi.string().required(),
            pincode: Joi.string().required(),
            latitude: Joi.string().required(),
            langitude: Joi.string().required(),
            addressId:Joi.string().required()
        })
        return updatevmartaddress.validate(params)
    },
    deletevmartaddressvalidations:(params)=>{
        var deleteVmartaddress = Joi.object({
            addressId:Joi.string().required()
        })
        return deleteVmartaddress.validate(params)
        
    }
}
module.exports = vmartAddress;