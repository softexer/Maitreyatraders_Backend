var VMARTADDRESS = require('../../app/Models/VmartAddress');
var VmartID = require('../Core/cartID')
var VmartAddressDBQuaries = {
    vmartaddressinsert: (params) => {
        var ID = VmartID.cartID(8);
        var date = new Date().getTime();
        var VmartAddressID = ID + '@' + date;
        var insertVmartAddressDB = new VMARTADDRESS({
            address: params.address,
            landmark: params.landmark,
            area: params.area,
            city: params.city,
            pincode: params.pincode,
            latitude: params.latitude,
            langitude: params.langitude,
            addressId: VmartAddressID
        })
        return insertVmartAddressDB;
    },
    VmartaddressfetchDb: (params) => {
        return VMARTADDRESS.find({}).exec();
    },
    checkdbinvmartaddress: (params) => {
        return VMARTADDRESS.findOne({ addressId: params.addressId }).exec();
    },
    updateaddressdb:(params)=>{
        return VMARTADDRESS.updateOne({ addressId: params.addressId },
            {$set:{ 
            address: params.address,
            landmark: params.landmark,
            area: params.area,
            city: params.city,
            pincode: params.pincode,
            latitude: params.latitude,
            langitude: params.langitude
        }})
    },
    deleteaddressdb:(params)=>{
        return VMARTADDRESS.deleteOne({ addressId: params.addressId }).exec();
    }
}
module.exports = VmartAddressDBQuaries;