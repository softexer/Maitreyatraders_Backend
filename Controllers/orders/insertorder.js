var validations = require('./ordersvalidations');
var dbQuaries = require('./ordersdbQuarys');

var moment = require('moment')
var fs = require('fs');
var path = require('path');
var Id = require('../Core/cartID')
var orderinsert = {
    ordersinsert: (params, callback) => {
        var { error } = validations.ordersinsertparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var PhoneNumberchecking = dbQuaries.customerPhoneNumberchecking(params);
        PhoneNumberchecking.then((founded)=>{
            if(founded){
                var date = moment().format('DDMMYYYY');
                var orderid = Id.cartID(6);
                var orderidgenerate = "OID" + orderid + "@" + date;
                var ids = [];
                for (var a = 0; a < params.products.length; a++) {
                    if (params.products[a].cartId) {
                        ids.push(params.products[a].cartId)
                    }
                }
                var insertorders = dbQuaries.insertordersdbparams(params, orderidgenerate);
                insertorders.save((inserted) => {
                    if (!inserted) {
                        var deletecartdata = dbQuaries.deletecartdataparams(ids);
                        deletecartdata.then((deleted) => {
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "order inserted successfully"
                                }
                            })
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "order inserted Failure"
                            }
                        })
                    }
                })
            }else{
                return callback({
                    status:200,
                    data:{
                        response:0,
                        message:"orderPhoneNumber not match Register PhoneNumber"
                    }
                })
            }
        })
        

    }
}
module.exports = orderinsert;