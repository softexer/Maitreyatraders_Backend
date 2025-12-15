
const paramValidations = require('./customerParamValidations');
const dbQueries = require('./customerDBQueries');

var UserLogoutController = {

    sessionOut:(params,callback)=>{
        const { error } = paramValidations.validateUserLogoutParameters(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            });
        }
            let sessionOutQuery = dbQueries.logoutUserFromDeviceQuery(params);
            sessionOutQuery.then((updated)=>{
                let OutQuery = dbQueries.logoutQuery(params);
                OutQuery.then((update)=>{
                if(update){
                    //console.log(updated);
                    callback({
                        status: 200,
                        data: {
                            response: 3,
                            message: "You have been successfully logged out"
                        }
                    });
                    return;
                                   
                }else{
                   // //console.log(err);
                    callback({
                        status: 200,
                        data: {
                            response: 0,
                            message: "You have falied to logged out"
                        }
                    });
                    return; 
                }
            })
        });
        
    }
}

module.exports = UserLogoutController;