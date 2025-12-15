
var SellerProducts = require('../../app/Models/SellerProducts');
var OrdersData = require('../../app/Models/orders');
var addcartData = require('../../app/Models/Cart');
var Customers = require('../../app/Models/customer')
var dbQauriesorders = {
    // productIDfetchdataparams: (params) => {
    //     return SellerProducts.findOne({ ProductID: params.ProductID }).exec();
    // },
    // cartdataidfetch:(params)=>{
    //     return addcartData.findOne({ cartId: params.cartId }).exec();
    // },
    insertordersdbparams: (params,orderidgenerate) => {
        console.log(params)
        var insertdataorders = new OrdersData({
            PhoneNumber:"+91"+params.PhoneNumber,
            orderId:orderidgenerate,
            carttotal: params.totalcost,
            deliverycharges: params.deliverycharges,
            deliverytype: params.deliverytype,
            address: params.address,
            pin: params.pin,
            deliverydate: params.deliverydate,
            deliverystatus: params.deliverystatus,
            orderstatus: params.orderstatus,
            paymentstatus: params.paymentstatus,
            Products:params.products
        })
        return insertdataorders;
    },
    customerPhoneNumberchecking:(params)=>{
return Customers.findOne({PhoneNumber:"+91"+params.PhoneNumber}).exec();
    },
    myorderslistfetchdata:(params)=>{
        return OrdersData.find({PhoneNumber:"+91"+params.PhoneNumber}).exec();
    },
    myordersdeleteddata:(params)=>{
        return OrdersData.deleteOne({PhoneNumber:"+91"+params.PhoneNumber,orderID:params.orderid})
    },
    deletecartdataparams:(ids)=>{
        return addcartData.deleteMany({cartId:{$in:ids}})
    },
    checkingordersinorderID:(params)=>{
        return OrdersData.findOne({PhoneNumber:"+91"+params.PhoneNumber,orderID:params.orderid}).exec();
    },
    orderCancelupdateparams:(params)=>{
        return OrdersData.updateOne({PhoneNumber:"+91"+params.PhoneNumber,orderID:params.orderid},
            {$set:{reason_for_cancel:params.reason_for_cancel,orderstatus:"Cancel"}})
    }
    
}
module.exports = dbQauriesorders;