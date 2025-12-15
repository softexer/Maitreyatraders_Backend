var validations = require('./validationProducts');
var dbQuaries = require('./dbQuariesProducts');

var fetchproducts = {
    productfetch: (params, callback) => {
        const { error } = validations.fetchProductsparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var dataftech = dbQuaries.productsdatafetchparamstype(params);
        dataftech.then((found) => {
            if (found.length > 0) {
                var fetchcartData = dbQuaries.customerfetchcartIDdata(params);
                fetchcartData.then((founded) => {
                    if (founded.length > 0) {
                        for (var a = 0; a < founded.length; a++) {
                            for (var b = 0; b < found.length; b++) {
                                if (founded[a].ProductID === found[b].ProductID) {
                                    found[b].customerQuantity=founded[a].quantity;
                                    found[b].VMART_Price=founded[a].vmartPrice;
                                    found[b].MRP_Price=founded[a].mrpPrice;
                                }
                            }
                        }
                    }
                    
                    return callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "Products Data found Successfully",
                            Info: found
                        }
                    })
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Products Data found failure",
                        Info: found
                    }
                })
            }
        })
    }

}
module.exports = fetchproducts;