var validations = require('./validationsCategory');
var dbQuaries = require('./categorydbQuaries');
var Categorys_Model = require('../../app/Models/Categories')

var ID = require('../Core/cartID')
var fs = require('fs');
var path = require('path');
var Joi = require('@hapi/joi')
var updateCT = {
    fetchcategorys: async (params, req, callback) => {

        var fetch_Category_Validation = Joi.object({
            categoryID: Joi.string().strict().required(),
        })
        const { error } = await fetch_Category_Validation.validate(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })
        }

        if (params.categoryID == "All") {
            var allcategoriesfetch = await Categorys_Model.find({}, { _id: 0, __v: 0 })
        } else {
            var allcategoriesfetch = await Categorys_Model.find({ categoryID: params.categoryID },
                { _id: 0, __v: 0 })
        }
        if (allcategoriesfetch.length > 0) {
            return callback({
                status: 200,
                data: {
                    response: 3,
                    message: "Category fetch successfully",
                    categorydata: allcategoriesfetch
                }
            })
        } else {
            return callback({
                status: 200,
                data: {
                    response: 0,
                    message: "No Category Found"
                }
            })
        }

    }
}
module.exports = updateCT;