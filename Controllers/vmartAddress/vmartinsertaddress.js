var validations = require('./vmartValidations');
var dbQuaries = require('./vmartaddressdbQuaries')

var insertVmartAdd = {
    insertvmartaddress: (params, callback) => {
        var { error } = validations.insertVmartAddressValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var insertaddress = dbQuaries.vmartaddressinsert(params);
        insertaddress.save((inserted)=>{
            if(!inserted){
             return callback({
                status:200,
                data:{
                    response:3,
                    message:"Vmart Address inserted Successfully"
                }
             })
            }else{
                return callback({
                    status:200,
                    data:{
                        response:0,
                        message:"Vmart Address inserted failure"
                    }
                 })
            }
        })

    }
}
module.exports = insertVmartAdd;