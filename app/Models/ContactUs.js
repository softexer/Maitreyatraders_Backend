var mongoose = require('mongoose');
var schema = mongoose.Schema;
var contactus = new schema({
    name:{
type:String,
required:true
    },
emailAddress:{
    type:String,
    required:true
},
Message:{
    type:String,
    required:true
},
merchantId:{
    type:String,
    required:true
},
userId:{
    type:String,
    required:true
},
timeContact:{
    type:String,
    required:true
},
})
module.exports =mongoose.model('contactus',contactus)