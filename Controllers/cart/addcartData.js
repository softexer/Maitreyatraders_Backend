
const validations = require('./cartdataValidations');
const dbQuaries = require('./cartdbQuaries')
var addcart = {
    cartaddData: (params, callback) => {
        var { error } = validations.cartaddparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var customerData = dbQuaries.customerDatafetch(params);
        customerData.then((found) => {
            if (found) {
                var checkingcartdata = dbQuaries.checkingcartdataproductID(params);
                checkingcartdata.then((fetched) => {
                    if (fetched) {
                       var updatedataaddcart = dbQuaries.updatedaddcartdataparams(params,fetched);
                       updatedataaddcart.then((updated)=>{
                        if(updated){
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "CartData added updated Successfully"
                                }
                            })
                        }else{
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "CartData added updated Failure"
                                }
                            })
                        }
                       })
                    } else {
                        var ProductDatafetch = dbQuaries.ProductDatafetchapiparams(params);
                        ProductDatafetch.then((founded) => {
                            if (founded) {
                                var insertDataCart = dbQuaries.cartdatainsertparama(params, founded);
                                insertDataCart.save((inserted) => {
                                    if (!inserted) {
                                        return callback({
                                            status: 200,
                                            data: {
                                                response: 3,
                                                message: "CartData added inserted Successfully"
                                            }
                                        })
                                    } else {
                                        return callback({
                                            status: 200,
                                            data: {
                                                response: 0,
                                                message: "CartData added inserted Successfully"
                                            }
                                        })
                                    }
                                })
                            } else {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: 0,
                                        message: "ProductID Data Not found Database"
                                    }
                                })
                            }
                        })
                    }
                })

            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Customer Data not founded please Register with us"
                    }
                })
            }
        })


    }
}
module.exports = addcart;