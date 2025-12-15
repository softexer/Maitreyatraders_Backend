var customer = require('./customerRegister');
var Customerverify = require('./customerverify');
var customerSignup = require('./customerSignup');
var getPaytm = require('./GetTxnTokenpaytmPgPayments');
var customerSignout = require('./customersignout');
var register = {
    RegisterCustomer: (params, callback) => {
        return customer.RegisterCustomer(params, callback)
    },
    verifyCustomer: (params, callback) => {
        return Customerverify.verifyCustomer(params, callback)
    },
    signupCustomer: (params, callback) => {
        return customerSignup.signupCustomer(params, callback)
    },
    signout: (params, callback) => {
        return customerSignout.sessionOut(params, callback)
    },
    getPaytmTxnToken: (params, callback) => {
        return getPaytm.getPaytmTxnToken(params, callback)
    }
}
module.exports = register