var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AdminData = new schema({
    adminuniqueID: {
        type: String,
        required: false,
        default: "AID" + new Date().getTime().toString(),
        unique: true,
        index: true
    },
    adminName: {
        type: String,
        required: false,
        default: ""
    },
    adminProfilePic: {
        type: String,
        required: false,
        default: ""
    },
    emailID:{
         type: String,
        required: false,
        default: ""
    },
    password:{
         type: String,
        required: false,
        default: ""
    },
    timestamp:{
         type: String,
        required: false,
        default: new Date().getTime().toString()
    }


})
module.exports = mongoose.model("admin", AdminData)