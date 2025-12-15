var validations = require('./contactusValidations');
var dbQuaries = require('./contactusdbquaries');

var insertcontact = {
    insertContactus: (params, callback) => {
        var { error } = validations.insertContactusvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var insertedContactdata = dbQuaries.contactusdatainserted(params);
        insertedContactdata.save((inserted)=>{
            if(!inserted){
                return callback({
                    status:200,
                    data:{
                        response:3,
                        message:"ContactUs Data inserted Successfully"
                    }
                })
            }else{
                return callback({
                    status:200,
                    data:{
                        response:0,
                        message:"ContactUs Data inserted Failure"
                    }
                })
            }
        })
    }
}
module.exports = insertcontact;