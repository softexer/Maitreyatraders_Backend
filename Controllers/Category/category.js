var insertCategory = require('./insertCategory');
var updatecategory = require('./updatecategory');
var insertsubCategory = require('./subcategoryinsert')
var categorys = {
categoryinsert:(params,req,callback)=>{
   return insertCategory.categoryinsert(params,req,callback)
},
categoryupdate:(params,req,callback)=>{
   return updatecategory.categoryupdate(params,req,callback)
},
subcategoryinsert:(params,req,callback)=>{
   return insertsubCategory.subcategoryinsert(params,req,callback)
},
subcategoryupdate:(params,req,callback)=>{
   return insertsubCategory.subcategoryupdate(params,req,callback)
},
subcategoryfetch:(params,callback)=>{
   return insertsubCategory.subcategoryfetch(params,callback);
},
subcategorypulldata:(params,callback)=>{
   return insertsubCategory.subcategorypulldata(params,callback);
},
categoriesDelete:(params,callback)=>{
   return insertsubCategory.categoriesDelete(params,callback);
},
}
module.exports = categorys;