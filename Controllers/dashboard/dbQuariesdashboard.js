var DashBoard = require('../../app/Models/DashboardData');
var Category = require('../../app/Models/Categories')
var dashdb = {
    checkingphoneNumberdb: (params) => {
        return DashBoard.findOne({ PhoneNumber: "+91"+params.PhoneNumber }).exec();
    },
    checkingCategoryNameandsubcategoryName: (params) => {
        return Category.findOne({ categoryName: params.CategoryName, "subCategorys.subCategoryName": params.subcategoryName },
            { _id: 0, categoryID: 1, subCategorys: { $elemMatch: { subCategoryName: params.subcategoryName } } })
    },
    inserteddashboardDataparams: (params, generateID, dbpathimage, categoryid, subcategoryid) => {
        if (params.type === "Advertiesments") {
            return DashBoard.updateOne({ PhoneNumber: "+91"+params.PhoneNumber },
                { $push: { advertisements: { advertiesmentID: generateID, CategoryID: categoryid, subCategoryID: subcategoryid, advertiesmentImage: dbpathimage } } })
        } else {
            return DashBoard.updateOne({ PhoneNumber:"+91"+params.PhoneNumber },
                { $push: { baners: { banersID: generateID, CategoryID: categoryid, subCategoryID: subcategoryid, banerImage: dbpathimage } } })
        }
    },
    dashboardcheckingDataparams: (params) => {
        if (params.type === "Advertiesments") {
            return DashBoard.findOne({ PhoneNumber:"+91"+params.PhoneNumber, "advertisements.advertiesmentID": params.Id },
                { _id: 0, PhoneNumber: 1, advertisements: { $elemMatch: { advertiesmentID: params.Id } } })
        } else {
            return DashBoard.findOne({ PhoneNumber:"+91"+params.PhoneNumber, "baners.banersID": params.Id },
                { _id: 0, PhoneNumber: 1, baners: { $elemMatch: { banersID: params.Id } } })
        }
    },
    updatedashboardDataparams: (params, filedbpath) => {
        if (params.type === "Advertiesments") {
            return DashBoard.updateOne({ PhoneNumber:"+91"+params.PhoneNumber, "advertisements.advertiesmentID": params.Id },
                { $set: { "advertisements.$.advertiesmentImage": filedbpath } })
        } else {
            return DashBoard.updateOne({ PhoneNumber:"+91"+params.PhoneNumber, "baners.banersID": params.Id },
                { $set: { "baners.$.banerImage": filedbpath } })
        }
    },
    removeDatadashboardparams: (params) => {
        if (params.type === "Advertiesments") {
            return DashBoard.updateOne({ PhoneNumber:"+91"+params.PhoneNumber },
                { $pull: { advertisements: { advertiesmentID: params.Id } } })
        } else {
            return DashBoard.updateOne({ PhoneNumber:"+91"+params.PhoneNumber },
                { $pull: { baners: { banersID: params.Id } } })
        }
    }
}
module.exports = dashdb;