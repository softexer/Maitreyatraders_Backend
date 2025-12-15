var validation = require('./customeraddressvalidation');
var dbQuary = require('./customerAddressDbQuaries');

var defaults = {
    customerdefaultaddress: (params, callback) => {
        const { error } = validation.defaultsaddressvalidationparams(params)
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var addressfetchapi = dbQuary.customeraddressfetch(params)
        addressfetchapi.then((found) => {
            if (found) {
                var updatedata = dbQuary.customeraddresschanges(params);
                updatedata.then((updated) => {
                    if (updated) {

                        var perticularaddressupdated = dbQuary.custmeraddressperticularupdate(params)
                        perticularaddressupdated.then((modifysuccess)=>{
                        if (modifysuccess) {
                            return callback({
                                status: 200,
                                data: {
                                    response: 3,
                                    message: "customer default address updated "
                                }
                            })
                        } else {
                            return callback({
                                status: 200,
                                data: {
                                    response: 0,
                                    message: "customer default address failure "
                                }
                            })
                        }
                    })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "customer default address failure "
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "customeraddress not found"
                    }
                })
            }
        })
    }
}
module.exports = defaults