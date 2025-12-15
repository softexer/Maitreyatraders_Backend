var mongoose = require('mongoose');
var schema = mongoose.Schema;
var DashboardData = new schema({
   PhoneNumber:{
        type:String,
        required:true,
        unique:true
     },
     advertisements: [{
      advertiesmentID:{
         type:String,
         required:true,
         unique:true
      },
      CategoryID: {
         type: String,
         required: false,
      },
      subCategoryID: {
         type: String,
         required: false
      },
      advertiesmentImage: {
         type: String,
         required: false
      },
      type: Object,
      required: false,
      default: []
   }],
   baners: [{
      banersID:{
         type:String,
         required:true,
         unique:true
      },
      CategoryID: {
         type: String,
         required: false,
      },
      subCategoryID: {
         type: String,
         required: false
      },
      banerImage: {
         type: String,
         required: false
      },
      type: Object,
      required: false,
      default: []
   }],
     
})
module.exports = mongoose.model('advertiesment',DashboardData);