var Joi = require('@hapi/joi');
var Promotion_Model = require('../../app/Models/Promotions');
var Admin_Model = require('../../app/Models/Admin');

module.exports.promotion_status_update = async (req,res)=>{
    try{
        var params = req.body;
        var ValidateParams = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            promotionID: Joi.string().strict().required(),
            status: Joi.string().strict().valid("Active","Inactive").required()
        })
        var result = await ValidateParams.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_adminuniqueID = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID }).exec();
        if (!Checking_adminuniqueID) {
            return res.json({ response: 0, message: "Admin uniqueID not valid" })
        }
        var PromotionIDChecking = await Promotion_Model.findOne({ promotionID: params.promotionID }).exec();
        if (!PromotionIDChecking) {
            return res.json({ response: 0, message: "Promotion ID not valid" })
        }

        var updatepromotionData =  await Promotion_Model.updateOne({ promotionID: params.promotionID },{
            $set:{
                isActive: params.status=="Active"?true:false,
                status:params.status
            }
        }).exec();
        if(updatepromotionData.modifiedCount > 0){
            return res.json({ response: 3, message: "Promotion status updated successfully" })
        }else{
            return res.json({ response: 0, message: "Promotion status update failure" })
        }
    }catch(error){
        return res.status(500).json({
            response:0,
            message:"Internal Server Error",
            errorDetails:error.message
        })
    }
}