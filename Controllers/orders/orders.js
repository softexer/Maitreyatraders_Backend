var insertordersapi = require('./insertorder');
var myordersapi = require('./fetchorders');
var myordersdelete = require('./deleteorders')
var ordersdata = {
ordersinsert:(params,callback)=>{
return insertordersapi.ordersinsert(params,callback)
},
myorders:(params,callback)=>{
    return myordersapi.myorders(params,callback)
},
myorderdelete:(params,callback)=>{
    return myordersdelete.myorderdelete(params,callback)
},
myordercancel:(params,callback)=>{
    return myordersdelete.myordercancel(params,callback)
},
}
module.exports = ordersdata;