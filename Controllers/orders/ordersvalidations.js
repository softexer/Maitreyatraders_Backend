const { object } = require('@hapi/joi');
var Joi = require('@hapi/joi');
var ordersvalidate ={
    ordersinsertparamsValidations:(params)=>{
        var insertorder = Joi.object({
            PhoneNumber:Joi.string().required(),
            products:Joi.array().items(Joi.object().keys({
                cartId:Joi.string().required(),
                ProductID:Joi.string().required(),
                ProductName: Joi.string().required(),
                quantity: Joi.string().required(),
                price: Joi.number().required(),
                NetWeight: Joi.string().required(),
                url:Joi.string().required(),
            }).required()).required(),
            totalcost: Joi.number().required(),
            deliverycharges:Joi.number().required(),
            deliverytype:Joi.string().required(), 
            address:Joi.string().required(),
            pin:Joi.string().required(),
            deliverydate: Joi.string().required(),
            deliverystatus:Joi.string().required(),
            paymentstatus: Joi.string().required()
        })
        return insertorder.validate(params)
    },
    myorderslistparamsValidations:(params)=>{
        var fetchdata = Joi.object({
            PhoneNumber:Joi.string().required()
        })
        return fetchdata.validate(params)
    

},
myordersdeleteparamsValidations:(params)=>{
    var deletedata = Joi.object({
        PhoneNumber:Joi.string().required(),
        orderid:Joi.string().required()
    })
    return deletedata.validate(params)
},
myordercancelparamsValidations:(params)=>{
    var myorderscancel =Joi.object({
        PhoneNumber:Joi.string().required(),
        orderid:Joi.string().required(),
        reason_for_cancel:Joi.string().required()
    })
    return myorderscancel.validate(params)
}

}
module.exports = ordersvalidate;