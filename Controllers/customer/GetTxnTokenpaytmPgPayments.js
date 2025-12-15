var paramValidations =require('./customerParamValidations');
var dbQueries = require('./customerDBQueries');

const Paytm = require("paytm-pg-node-sdk");
const paytmConfigs = require('../Core/paytmConfig');
const PaytmOperations = require("../Core/PaytmOperations");
const PaytmAppOperatins = require("../Core/PaytmappOperations");

var paytmInfo = {
    getPaytmTxnToken : (params,callback) =>{
        const { error } = paramValidations.validateGetTokenPaymentsParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message,
                }
            })
        }
        
        if(params.channelId == "WEB"){
            PaytmOperations.createTxnTokenwithRequiredParams(params,(response)=>{
                return callback(response);
            })
        }else{
            PaytmAppOperatins.createTxnTokenwithRequiredParams(params,(response)=>{
                return callback(response);
            })
        }
     
       

    }
}

module.exports = paytmInfo;