var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('device', new Schema({

    PhoneNumber: {
        type:String,
        unique:true,
		index:true,
        required:true
    },

    devices:{

        web:[{
            deviceID: {
                type:String
            },
            deviceToken: {
                type:String
            },
            login: Boolean
        }],

        mobile:[{
            deviceID: {
                type:String,
                required:true
            },
            deviceToken: {
                type:String,
                required:true
            },
            login:Boolean
        }]

    }
}));