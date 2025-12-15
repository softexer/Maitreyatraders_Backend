var insertVmartAddress = require('./vmartinsertaddress');
var fecthVmartAddress = require('./vmartFetchAddress')
var VmartADD = {
    insertvmartaddress: (params, callback) => {
        return insertVmartAddress.insertvmartaddress(params, callback)
    },
    fetchvmartaddress: (params, callback) => {
        return fecthVmartAddress.fetchvmartaddress(params, callback)
    },
    updatevmartaddress: (params, callback) => {
        return fecthVmartAddress.updatevmartaddress(params, callback)
    },
    deletevmartaddress: (params, callback) => {
        return fecthVmartAddress.deletevmartaddress(params, callback)
    },
}
module.exports = VmartADD;