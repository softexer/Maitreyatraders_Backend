var Seller = require('../../app/Models/SellersRegister');
var merID = require('../Core/cartID');
var dashboards = require('../../app/Models/DashboardData');
var orders = require('../../app/Models/orders');
var devices = require('../../app/Models/devicetype');
var NotificationInbox = require('../../app/Models/NotificationInbox');
var Customer = require('../../app/Models/customer');
var sellerProduct = require('../../app/Models/SellerProducts')

var sellerdbQuaries = {
    devicemodulephonecheckingDataparams:(phone)=>{
return devices.findOne({PhoneNumber:phone}).exec();
    },
    sendnotificationcustomerinbox:(phone,data)=>{
var date = new Date().getTime().toString();
var ids =merID.cartID(5);
            var notifyId ="notify_"+date+ids;
            var isread=false;
            data.notifyID = notifyId;
            data.timestamp =date;
            data.isRead = isread;
            return NotificationInbox.updateOne({PhoneNumber:phone},{$push:{NotificationsInbox:data}})
    },
    fecthsellerdata: (params) => {
        return Seller.findOne({ $or: [{ userID: params.userID }, { PhoneNumber:"+91"+params.PhoneNumber }] })
    },
    sellerDatafetch: (params) => {
        return Seller.find({}).exec();
    },
    registersellerparams: (params, password) => {
        var date = new Date().getTime();
        var idmerchent = merID.cartID(8);
        var merchentID = "MID" + "@" + date + idmerchent;
        var Registerseller = new Seller({
            Name: params.Name,
            userID: params.userID,
            PhoneNumber:"+91"+params.PhoneNumber,
            BankName: params.BankName,
            AccountNumber: params.AccountNumber,
            IFSCCode: params.IFSCCode,
            AccountName: params.AccountName,
            RegisterDate: date,
            Otp: params.Otp,
            merchantID: merchentID,
            Password: password
        })
        return Registerseller;
    },
    dashboardinsertedparam: (params) => {
        var insertdash = new dashboards({
            PhoneNumber:"+91"+params.PhoneNumber
        })
        return insertdash
    },
    logindatafindparams: (params) => {
        return Seller.findOne({ $or: [{ userID: params.userID }, { PhoneNumber:"+91"+params.userID }] })
    },
    findDataforupdatepassword: (params) => {
        return Seller.findOne({ $or: [{ userID: params.userID }, { PhoneNumber:"+91"+params.userID }] })
    },
    passwordupdateparams: (params, phone, password) => {
        return Seller.updateOne({ PhoneNumber: phone }, { $set: { Password: password } })
    },
    sellerdataget: (params) => {
        return Seller.findOne({ $or: [{ PhoneNumber:"+91"+params.PhoneNumber }, { userID: params.PhoneNumber }] })
    },
    totalordersfetchparams:(params)=>{
        if(params.type ==="All"){
            return orders.find({}).exec();
        }else{
            return orders.find({orderstatus:params.type}).exec();
        }
    },
    dateRangetotalordersfetchparams:(d1,d2)=>{
        return orders.find({deliverydate:{$gte:d1,$lte:d2}})
    },
    fetchordersdata:(params)=>{
        return orders.find({orderId:params.orderId}).exec();
    },
    updatedataorederparams:(params)=>{
        return orders.updateOne({orderId:params.orderId},{$set:{orderstatus:params.orderstatus}})
    },
    customerdatagetmobilenumber:(phone)=>{
        return Customer.findOne({PhoneNumber:phone},{userID:1})
    },
    productidbasedfetchData:(productid)=>{
        return sellerProduct.findOne({ProductID:productid}).exec();
    },
    updateproductquantity:(productid,quantity)=>{
        return sellerProduct.updateOne({ProductID:productid},{$set:{stockquantity:quantity}})
    },
    updateproductstatus:(productid)=>{
        return sellerProduct.updateOne({ProductID:productid},{$set:{Product_Status:false}})
    }
}
module.exports = sellerdbQuaries;