var validations = require('./validationstodaydeals');
var dbQuaries = require('./dbQuariestodaydeals');

var fetchproducts ={
    todaydealsfetch:(params,callback)=>{
    const { error } = validations.fetchProductsparamsvalidations(params);
    if (error) {
        return callback({
            status: 400,
            data: {
                response: 0,
                message: error.details[0].message
            }
        })
    }
    var dataftech = dbQuaries.productsdatafetchparamstype(params);
    dataftech.then((found)=>{
        if(found.length>0){
            return callback({
                status:200,
                data:{
                    response:3,
                    message:"Products Data found Successfully",
                    Info:found
                }
            })
        }else{
            return callback({
                status:200,
                data:{
                    response:0,
                    message:"Products Data found failure",
                    Info:found
                }
            })
        }
    })
}

}
module.exports = fetchproducts;