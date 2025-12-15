var mongoose =require('mongoose');
var schema = mongoose.Schema;
    var inbox = schema({
    PhoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    NotificationsInbox:{
        type:Array,
        required:false,
        default:[]
    }
})
module.exports=mongoose.model('notificationinbox',inbox)
