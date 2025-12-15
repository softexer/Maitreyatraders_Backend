var inserttodaydealsProductsapi = require('./inserttodaydeals');
var updatetodaydealsProductsapi = require('./updatetodaydeals')
var fetchtodaydealsproductsapi = require('./fetchtodaydeals');
var deletetodaydealsproductapi = require('./deletetodaydeals')
var products ={
    todaydealsinsert:(params,req,callback)=>{
return inserttodaydealsProductsapi.todaydealsinsert(params,req,callback)
},
todaydealsupdate:(params,req,callback)=>{
    return updatetodaydealsProductsapi.todaydealsupdate(params,req,callback)
},
todaydealsfetch:(params,callback)=>{
    return fetchtodaydealsproductsapi.todaydealsfetch(params,callback)
},
todaydealsdelete:(params,callback)=>{
    return deletetodaydealsproductapi.todaydealsdelete(params,callback)
}
}
module.exports = products;