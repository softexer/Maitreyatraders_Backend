var addcustomeraddressdata = require('./addcustomeraddress');
var updatecustomeraddressdata = require('./updateuserAddressData');
var deletecustomeraddressdata = require('./deleteCustomerAddress');
var fetchcustomeraddressdata = require('./customerAddressDatafetch');
var defaultaddress  = require('./defaltaddress');
var cart = {
    useraddressaddData: (params, callback) => {
        return addcustomeraddressdata.useraddressaddData(params, callback)
    },
    useraddressupdateDataupdateData: (params, callback) => {
        return updatecustomeraddressdata.useraddressupdateDataupdateData(params, callback)
    },
    useraddressdeleteData: (params, callback) => {
        return deletecustomeraddressdata.useraddressdeleteData(params, callback)
    },
    useraddressfectchData: (params, callback) => {
        return fetchcustomeraddressdata.useraddressfectchData(params, callback)
    },
    customerdefaultaddress:(params,callback)=>{
        return defaultaddress.customerdefaultaddress(params,callback)
    }
}
module.exports = cart;