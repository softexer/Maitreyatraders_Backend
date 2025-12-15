
var validations = require('./ordersvalidations');
var dbQuaries = require('./ordersdbQuarys');

var myorderdeleted = {
    myorderdelete: (params, callback) => {
        var { error } = validations.myordersdeleteparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }

        var datafetchorderslist = dbQuaries.myordersdeleteddata(params);
        datafetchorderslist.then((deleted) => {
            console.log(deleted)
            if (deleted) {
                return callback({
                    status: 200,
                    data:{
                    response: 3,
                    message: "order deleted successfully",
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data:{
                    response: 0,
                    message: "order deleted Failure",
                    }
                })
            }
        })

    },
    myordercancel:(params,callback)=>{
        var { error } = validations.myordercancelparamsValidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var checkingordersdata = dbQuaries.checkingordersinorderID(params);
        checkingordersdata.then((founded)=>{
            if(founded){
             var updateordersforcancel = dbQuaries.orderCancelupdateparams(params);
             updateordersforcancel.then((updated)=>{
                if(updated){
                    return callback({
                        status: 200,
                        data:{
                        response: 3,
                        message: "your order Cancel Successfully",
                        }
                    })
                }else{
                    return callback({
                        status: 200,
                        data:{
                        response: 0,
                        message: "order Cancel failure",
                        }
                    })
                }
             })
            }else{
                return callback({
                    status: 200,
                    data:{
                    response: 0,
                    message: "this orderID Data not found",
                    }
                })
            }
        }) 
    }
}
module.exports=myorderdeleted;