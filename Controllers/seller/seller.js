const sellerRegisterapi = require('./sellerRegisterApi');
const sellerloginapi = require('./sellerlogin');
const totalordersapi = require('./Vmarttotalordersapi')
var seller = {
    SellerRegister: (params, callback) => {
        return sellerRegisterapi.SellerRegister(params, callback)
    },
    Sellerlogin: (params, callback) => {
        return sellerloginapi.Sellerlogin(params, callback)
    },
    SellerUpdatePassword: (params, callback) => {
        return sellerloginapi.SellerUpdatePassword(params, callback)
    },
    Sellerdatafetch: (params, callback) => {
        return sellerloginapi.Sellerdatafetch(params, callback)
    },
    totalorders:(params,callback)=>{
        return totalordersapi.totalorders(params,callback)
    },
    orderconform:(params,callback)=>{
        return totalordersapi.orderconform(params,callback)
    }
}
module.exports = seller;