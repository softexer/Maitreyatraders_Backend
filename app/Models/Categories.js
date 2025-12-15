const mongoose = require('mongoose');
let schema = mongoose.Schema;

var Categories = new schema({
   categoryName: {
      type: String,
      required: true,
      unique: true
   },
   CategoryImage: {
      type: String,
      required: false
   },
   categoryID: {
      type: String,
      required: false,
      unique: true
   },
   subCategorys: [{
      subCategoryID: {
         type: String,
         required: false,
         unique: true
      },
      subCategoryName: {
         type: String,
         required: false
      },
      SubCategoryProfilePic: {
         type: String,
         required: false
      },
      type: Object,
      required: false,
      default: []
   }],
});

module.exports = mongoose.model('Categories', Categories);