var insertwhishlist = require('./insertwishlist');
var whishlistfetchapi = require('./fetchwhishlist');
var whishlistdeleteapi = require('./deletewhishlist')
var whish = {
whishlistinsert:(params,callback)=>{
return insertwhishlist.whishlistinsert(params,callback)
},
whishlistfetch:(params,callback)=>{
return whishlistfetchapi.whishlistfetch(params,callback)
},
whishlistdelete:(params,callback)=>{
    return whishlistdeleteapi.whishlistdelete(params,callback)
    },
}
module.exports = whish;