var validations = require('./validationsCategory');
var dbQuaries = require('./categorydbQuaries');
var Category_Model = require('../../app/Models/Categories')

var ID = require('../Core/cartID')
var fs = require('fs');
var path = require('path')
var updateCT = {
    categoryupdate: async (params, req, callback) => {
        const { error } = validations.updatecategoryparamsvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }
        var CategoryIDChecking = await Category_Model.findOne({ categoryID: params.categoryID });
        if (!CategoryIDChecking) {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "CategoryID not found"
                }
            })
        }
        var CategoryNameChecking = await Category_Model.findOne({ categoryName: params.categoryName, categoryID: { $ne: params.categoryID } });
        if (CategoryNameChecking) {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "Already this CategoryName used"
                }
            })
        }
        var updateCategoryName = await Category_Model.updateOne({ categoryID: params.categoryID }, { $set: { categoryName: params.categoryName } });
        if (updateCategoryName.modifiedCount > 0) {
            return callback({
                status: 200,
                data: {
                    response: 3,
                    message: "Category updated successfully"
                }
            })
        } else {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "Category updated failure"
                }
            })
        }

    }
}
module.exports = updateCT;