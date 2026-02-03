var Joi = require('@hapi/joi');
var Admin_Model = require('../../app/Models/Admin');
module.exports.Admin_Update_Policies_Files_Api = async function Admin_Update_Policies_Files_Api(req, res) {
    try {
        var params = JSON.parse(req.body.PoliciesData);
        var UpdatePoliciesFilesValidate = Joi.object({
            adminuniqueID: Joi.string().strict().required(),
            policyType: Joi.string().strict().valid("PrivacyAndPolicy", "TermsAndCondition", "ShippingAndDeliveryPolicy", "DisclaimerPolicy", "RefundAndReturnPolicy").required(),
        })
        var result = await UpdatePoliciesFilesValidate.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_Admin = await Admin_Model.findOne({ adminuniqueID: params.adminuniqueID });
        if (Checking_Admin) {
            if (req.files != null && req.files.policyFile != null) {
                var policyFile = req.files.policyFile;
                var file = req.files.policyFile;
                var date = new Date().getTime().toString();
                var uploadPath = "./public/images/PoliciesFiles/" + date + "_" + file.name;
                var dbpath = "/images/PoliciesFiles/" + date + "_" + file.name;
                file.mv(uploadPath, async function (err) {
                    if (err) {
                        return res.json({ response: 0, message: "File upload error" })
                    } else {
                        var UpdateAdminData
                        if (params.policyType == "PrivacyAndPolicy") {
                            UpdateAdminData = await Admin_Model.updateOne({ adminuniqueID: params.adminuniqueID }, {
                                $set: {
                                    privacyAndPolicyFile: dbpath
                                }
                            })
                        } else if (params.policyType == "TermsAndCondition") {
                            UpdateAdminData = await Admin_Model.updateOne({ adminuniqueID: params.adminuniqueID }, {
                                $set: {
                                    termsAndConditionFile: dbpath
                                }
                            })
                        } else if (params.policyType == "ShippingAndDeliveryPolicy") {
                            UpdateAdminData = await Admin_Model.updateOne({ adminuniqueID: params.adminuniqueID }, {
                                $set: {
                                    shippingAndDeliveryPolicyFile: dbpath
                                }
                            })
                        } else if (params.policyType == "DisclaimerPolicy") {
                            UpdateAdminData = await Admin_Model.updateOne({ adminuniqueID: params.adminuniqueID }, {
                                $set: {
                                    disclaimerPolicyFile: dbpath
                                }
                            })
                        } else if (params.policyType == "RefundAndReturnPolicy") {
                            UpdateAdminData = await Admin_Model.updateOne({ adminuniqueID: params.adminuniqueID }, {
                                $set: {
                                    refundAndReturnPolicyFile: dbpath
                                }
                            })
                        }
                        if (UpdateAdminData.modifiedCount > 0) {
                            //previous file unlink
                            if (params.policyType == "PrivacyAndPolicy") {
                                if (Checking_Admin.privacyAndPolicyFile != "") {
                                    var previousfile = "./public" + Checking_Admin.privacyAndPolicyFile;
                                    fileunlinkmethod(previousfile);
                                }
                            } else if (params.policyType == "TermsAndCondition") {
                                if (Checking_Admin.termsAndConditionFile != "") {
                                    var previousfile = "./public" + Checking_Admin.termsAndConditionFile;
                                    fileunlinkmethod(previousfile)
                                }
                            } else if (params.policyType == "ShippingAndDeliveryPolicy") {
                                if (Checking_Admin.shippingAndDeliveryPolicyFile != "") {
                                    var previousfile = "./public" + Checking_Admin.shippingAndDeliveryPolicyFile;
                                    fileunlinkmethod(previousfile)
                                }
                            } else if (params.policyType == "DisclaimerPolicy") {
                                if (Checking_Admin.disclaimerPolicyFile != "") {
                                    var previousfile = "./public" + Checking_Admin.disclaimerPolicyFile;
                                    fileunlinkmethod(previousfile)
                                }
                            } else if (params.policyType == "RefundAndReturnPolicy") {
                                if (Checking_Admin.refundAndReturnPolicyFile != "") {
                                    var previousfile = "./public" + Checking_Admin.refundAndReturnPolicyFile;
                                    fileunlinkmethod(previousfile)
                                }
                            }
                            return res.json({ response: 3, message: "Policy file updated successfully" })
                        } else {
                            return res.json({ response: 0, message: "Policy file update failed" })
                        }
                    }
                })

            } else {
                return res.json({ response: 0, message: "Policy file is required" })
            }
        } else {
            return res.json({ response: 0, message: "Admin not found" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ response: 0, message: "Internal Service Error" })
    }
}

async function fileunlinkmethod(previousfile) {
    fs.unlink(previousfile, (err) => {
        if (err) {
            console.log("Previous refundAndReturnPolicyFile unlink error:", err)
        } else {
            console.log("Previous refundAndReturnPolicyFile deleted successfully");
        }
    });
}