var insertProductsapi = require('./insertProductsapi');
var updateProductsapi = require('./updateproductapi')
var fetchproductsapi = require('./fetchproductsapi');
var deleteproductapi = require('./deleteProductsapi');
var searchproducts = require('./searchproducts')

var products ={
productinsert:(params,req,callback)=>{
return insertProductsapi.productinsert(params,req,callback)
},
productupdate:(params,req,callback)=>{
    return updateProductsapi.productupdate(params,req,callback)
},
productfetch:(params,callback)=>{
    return fetchproductsapi.productfetch(params,callback)
},
productdelete:(params,callback)=>{
    return deleteproductapi.productdelete(params,callback)
},
customersearchproducts:(params,callback)=>{
    return searchproducts.customersearchproducts(params,callback)
}
}
module.exports = products;