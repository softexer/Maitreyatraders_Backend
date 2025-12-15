var addcartdata = require('./addcartData');
var updatecartdata = require('./updateaddcartData');
var deletecartdata = require('./deletecartData');
var fetchCartData = require('./CartDatafecth')
var cart = {
    cartaddData: (params, callback) => {
        return addcartdata.cartaddData(params, callback)
    },
    cartupdateData: (params, callback) => {
        return updatecartdata.cartupdateData(params, callback)
    },
    cartdeleteData: (params, callback) => {
        return deletecartdata.cartdeleteData(params, callback)
    },
    cartfectchData: (params, callback) => {
        return fetchCartData.cartfectchData(params, callback)
    },
    cartdataDeleteall: (params, callback) => {
        return deletecartdata.cartdataDeleteall(params, callback)
    }
}
module.exports = cart;