var customers = require('../../app/Models/customer');
var CustomersAddress = require('../../app/Models/customersaddress');
var addressIDS = require('../Core/cartID')
var customerAddressDBQuaries = {
    customerDatacheckingparams: (params) => {
        return customers.findOne({ PhoneNumber: "+91" + params.mobile }).exec();
    },
    customeraddressinsertparams: (params) => {
        var date = new Date().getTime();
        var addID = addressIDS.cartID(10);
        var addressIDGenerate = addID + "@" + date;
        var addressaddcustomers = new CustomersAddress({
            pinCode: params.pinCode,
            address: params.address,
            name: params.name,
            state: params.state,
            PhoneNumber: "+91" + params.mobile,
            city: params.city,
            area: params.area,
            landmark: params.landmark,
            userId: params.userId,
            favourite: params.favourite,
            latitude: params.latitude,
            longitude: params.longitude,
            timeStamp: params.timeStamp,
            addressID: addressIDGenerate
        })
        return addressaddcustomers;
    },
    customerAddressCheckingParams: (params) => {
        return CustomersAddress.findOne({ addressID: params.addressID })
    },
    updateCustomersAddressData: (params) => {
        return CustomersAddress.updateOne({ addressID: params.addressID },
            {
                $set: {
                    pinCode: params.pinCode,
                    address: params.address,
                    name: params.name,
                    state: params.state,
                    PhoneNumber: "+91" + params.mobile,
                    city: params.city,
                    area: params.area,
                    landmark: params.landmark,
                    userId: params.userId,
                    favourite: params.favourite,
                    latitude: params.latitude,
                    longitude: params.longitude,
                    timeStamp: params.timeStamp
                }
            })
    },
    userAddressFetch: (params) => {
        return CustomersAddress.find({ PhoneNumber: "+91" + params.mobile })
    },
    useraddressdeleteDataparams: (params) => {
        return CustomersAddress.deleteOne({ addressID: params.addressID })
    },
    customeraddressfetch: (params) => {
        return CustomersAddress.findOne({ PhoneNumber: "+91" + params.mobile, addressID: params.addressID })
    },
    customeraddresschanges: (params) => {

        return CustomersAddress.updateMany({ PhoneNumber: "+91" + params.mobile }, { $set: { isdefault: false } });
    },
    custmeraddressperticularupdate: (params) => {

        return CustomersAddress.updateOne({ PhoneNumber: "+91" + params.mobile, addressID: params.addressID }, { $set: { isdefault: true } })

    }

}
module.exports = customerAddressDBQuaries;