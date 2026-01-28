var Joi = require('@hapi/joi');
var order_Model = require('../../app/Models/orders');
var Products_Model = require('../../app/Models/Products_Schema')
var fs = require('fs')
module.exports.Order_Insert_Api = async function Order_Insert_Api(req, res) {
    try {
        var params = req.body;
        var OrderInsert_Validation = Joi.object({
            // orderId:
            contactData: Joi.string().strict().required(),
            Products: Joi.array().items(Joi.object().keys({
                productID: Joi.string().strict().required(),
                productName: Joi.string().strict().required(),
                categoryID: Joi.string().strict().required(),
                subCategoryID: Joi.string().strict().required(),
                quantity: Joi.number().integer().strict().required(),
                price: Joi.number().strict().required(),
                weight: Joi.string().strict().required(),
                productImagePath: Joi.string().strict().required(),
            }).required()).required(),
            addressDetails: Joi.object({
                country: Joi.string().strict().required(),
                firstName: Joi.string().strict().required(),
                lastName: Joi.string().strict().required(),
                address: Joi.string().strict().required(),
                apartment: Joi.string().strict().required(),
                city: Joi.string().strict().required(),
                state: Joi.string().strict().required(),
                pincode: Joi.string().strict().required(),
                phoneNumber: Joi.string().strict().optional().allow(""),
            }).required(),
            shippingMethod: Joi.string().strict().required(),
            billingAddressDetails: Joi.object({
                country: Joi.string().strict().required(),
                firstName: Joi.string().strict().required(),
                lastName: Joi.string().strict().required(),
                address: Joi.string().strict().required(),
                apartment: Joi.string().strict().required(),
                city: Joi.string().strict().required(),
                state: Joi.string().strict().required(),
                pincode: Joi.string().strict().required(),
                phoneNumber: Joi.string().strict().optional().allow(""),
            }).required(),
            coupanCode: Joi.string().strict().required().allow(""),
            coupanAmount: Joi.number().strict().required().allow(0).default(0),
            subTotal: Joi.number().strict().required(),
            fronzenCharges: Joi.number().strict().required(),
            deliveryFee: Joi.number().strict().required(),
            totalToPay: Joi.number().strict().required(),
            paymentType: Joi.string().strict().required(),
            paymentData: Joi.object().strict().required(),
        })
        var result = await OrderInsert_Validation.validate(params);
        if (result.error) {
            console.log("Order Insert Validation Error:", result.error.details[0].message);
            return res.status(400).json({ response: 0, message: result.error.details[0].message })
        }
        const OIDNumber = Math.floor(100000 + Math.random() * 900000);
        //console.log(otp);

        // var orderID = await order_Model.countDocuments({});
        // var OIDGenerate = 1000 + orderID
        var OrderDataFetch = await order_Model.findOne({}).sort({ orderTimeStamp: -1 }).limit(1)
        if (OrderDataFetch) {
            var splitdata = OrderDataFetch.orderId.split("-");
            var splitpostionGet = splitdata[1]
            var GenerateID = "ORD" + "-" + (Number(splitpostionGet) + 1)

        } else {
            var GenerateID = "ORD-100001"
        }
        var OID = "#" + OIDNumber + new Date().getFullYear()
        var orderinsert = await order_Model.insertMany([{
            orderUniqueID: OID,
            orderId: GenerateID,
            contactData: params.contactData,
            emailID: params.contactData,
            phoneNumber: params.contactData,
            Products: params.Products,
            addressDetails: params.addressDetails,
            shippingMethod: params.shippingMethod,
            billingAddressDetails: params.billingAddressDetails,
            coupanCode: params.coupanCode,
            coupanAmount: params.coupanAmount,
            subTotal: params.subTotal,
            deliveryFee: params.deliveryFee,
            totalToPay: params.totalToPay,
            fronzenCharges: params.fronzenCharges,
            paymentType: params.paymentType,
            paymentData: params.paymentData,
            orderStatus: "New",
            paymentStatus: "Completed",
            orderTimeStamp: new Date().getTime().toString()
        }])
        if (orderinsert.length > 0) {
            OrderCompletdeMail(params, OID, GenerateID);
            OrderCompletdeMail_NewFormate(params, OID, GenerateID)
            return res.json({
                response: 3,
                message: "Order booking successfully completed",
                orderData: orderinsert

            })
        } else {
            return res.json({ response: 0, message: "Order booking failure" })
        }
    } catch (error) {
        return res.json({
            response: 0,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

async function OrderCompletdeMail(params, OID, GenerateID) {
    var nodemailer = require('nodemailer')
    fs.readFile("./app/ConfigFiles/OrderInsert.html", function (err, data) {
        if (!err) {
            var html = data.toString();
            html = html.replace("123456", GenerateID)
            html = html.replace("Mohan Reddy", params.billingAddressDetails.firstName + " " + params.billingAddressDetails.lastName);
            html = html.replace(
                "{{BILLING_ADDRESS}}",
                `Flat No ${params.billingAddressDetails.apartment}, ${params.billingAddressDetails.address}<br>
   ${params.billingAddressDetails.city}, ${params.billingAddressDetails.state} - ${params.billingAddressDetails.pincode}<br>
   ${params.billingAddressDetails.country}`
            );
            //<br>${params.billingAddressDetails.phoneNumber

            // html = html.replace("Flat No 301, Ameerpet", "Flat No" + params.billingAddressDetails.apartment + " " + params.billingAddressDetails.address+","+"\n"+params.billingAddressDetails.city+" "+params.billingAddressDetails.state+"-"+params.billingAddressDetails.pincode+" "+params.billingAddressDetails.country);
            html = html.replace("+91 8106022423", params.billingAddressDetails.phoneNumber);
            html = html.replace("₹1,430", "£" + params.subTotal);
            html = html.replace("₹50", "£" + params.deliveryFee);
            var frozen = false;
            let grtot = "";
            if (params.fronzenCharges > 0) {
                grtot += `<tr>
                    <td class="label">Frozen Charges:</td>
                    <td class="text-right">£ ${params.fronzenCharges}</td>
                </tr>`
                frozen = true
                // html = html.replace("₹10", "£" + params.fronzenCharges)
            }
            grtot += `<tr>
                    <td class="label grand-total">Grand Total:</td>
                    <td class="text-right grand-total">£ ${params.totalToPay} </td>
                </tr>`

            // html = html.replace("₹1,551.50", "£" + params.totalToPay);
            //  grtot += "</tr>"
            //html = html.replace("MohanReddy",)
            html = html.replace("#GRtotal", grtot)
            var TR = "";
            var products = params.Products
            for (var count = 0; count < products.length; count++) {
                if (products[count]) {
                    TR += "<tr>";
                    TR += `<td>${count + 1}</td>`;
                    TR += `<td>${products[count].productName} (${products[count].weight})</td>`;
                    TR += `<td>${products[count].quantity}</td>`;
                    TR += `<td>${products[count].price}</td>`;
                    TR += `<td>${products[count].price * products[count].quantity} </td>`;;
                    TR += "</tr>";
                }
            }
            html = html.replace("#TrRow", TR)
            // html = html.replaceAll("User", params.firstName);
            // html = html.replaceAll("“XXXXXX”", otp);
            //var html = str.replace("#RESET_LINK#", resetLink);
            // var html1 = html.replace("#RESET_LINK#", resetLink);
            // sendMail(toEmail, subject, html);
            let transport = nodemailer.createTransport({
                name: "SMTP",
                host: "mail.maitreyatraderslimited.co.uk",
                port: 465,
                secure: true,
                auth: {
                    user: "enquiry@maitreyatraderslimited.co.uk",
                    pass: "Kiran@2026",
                }
            })
            let mailOptions = {
                from: "enquiry@maitreyatraderslimited.co.uk",
                to: params.contactData,
                subject: `Your Order ConformationThank you for your order! 🎉 Order ID: ${GenerateID}`,
                html: html,
            }
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);

                } else {
                    console.log('send mail' + info.response)
                }
            })
        } else {
            console.log(err);
        }
    });
}

async function OrderCompletdeMail_NewFormate(params, OID, GenerateID) {
    var nodemailer = require('nodemailer')
    fs.readFile("./app/ConfigFiles/Order_Insert_Formate.html", function (err, data) {
        if (!err) {
            var html = data.toString();
            const date = new Date();

            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            });

            console.log(formattedDate);
            // January 27, 2026

            html = html.replace("NT-ORD-784512", GenerateID)
            html = html.replace("Credit Card (Visa)", params.paymentType)
            html = html.replace("January 27, 2026", formattedDate)
            html = html.replace("Ananya Sharma", params.billingAddressDetails.firstName + " " + params.billingAddressDetails.lastName);
            html = html.replace(
                "{{BILLING_ADDRESS}}",
                `Flat No ${params.billingAddressDetails.apartment},<br> ${params.billingAddressDetails.address}<br>
   ${params.billingAddressDetails.city}, ${params.billingAddressDetails.state} - ${params.billingAddressDetails.pincode}<br>
   ${params.billingAddressDetails.country}`
            );
            //<br>${params.billingAddressDetails.phoneNumber

            // html = html.replace("Flat No 301, Ameerpet", "Flat No" + params.billingAddressDetails.apartment + " " + params.billingAddressDetails.address+","+"\n"+params.billingAddressDetails.city+" "+params.billingAddressDetails.state+"-"+params.billingAddressDetails.pincode+" "+params.billingAddressDetails.country);
            html = html.replace("+91 8106022423", params.billingAddressDetails.phoneNumber);
            html = html.replace("₹1,997", "£" + params.subTotal);
            html = html.replace("₹99", "£" + params.deliveryFee);
            var frozen = false;
            let grtot = "";
            if (params.fronzenCharges > 0) {
                grtot += `<tr>
                    <td class="label">Frozen Charges:</td>
                    <td class="text-right">£ ${params.fronzenCharges}</td>
                </tr>`
                frozen = true
                // html = html.replace("₹10", "£" + params.fronzenCharges)
            }
            grtot += `<tr>
                    <td class="label grand-total">Grand Total:</td>
                    <td class="text-right grand-total">£ ${params.totalToPay} </td>
                </tr>`

            // html = html.replace("₹1,551.50", "£" + params.totalToPay);
            //  grtot += "</tr>"
            //html = html.replace("MohanReddy",)
            html = html.replace("#GRtotal", grtot)
            var TR = "";
            var products = params.Products
            for (var count = 0; count < products.length; count++) {
                if (products[count]) {
                    TR += "<tr>";
                    TR += `<td>${count + 1}</td>`;
                    TR += `<td>${products[count].productName} (${products[count].weight})</td>`;
                    TR += `<td>${products[count].quantity}</td>`;
                    //TR += `<td>${products[count].price}</td>`;
                    TR += `<td>${products[count].price * products[count].quantity} </td>`;;
                    TR += "</tr>";
                }
            }
            html = html.replace("#TrRow", TR)
            // html = html.replaceAll("User", params.firstName);
            // html = html.replaceAll("“XXXXXX”", otp);
            //var html = str.replace("#RESET_LINK#", resetLink);
            // var html1 = html.replace("#RESET_LINK#", resetLink);
            // sendMail(toEmail, subject, html);
            let transport = nodemailer.createTransport({
                name: "SMTP",
                host: "mail.maitreyatraderslimited.co.uk",
                port: 465,
                secure: true,
                auth: {
                    user: "enquiry@maitreyatraderslimited.co.uk",
                    pass: "Kiran@2026",
                }
            })
            let mailOptions = {
                from: "enquiry@maitreyatraderslimited.co.uk",
                //to: params.contactData,
                to: "venkat9351@gmail.com",
                subject: `Your Order ConformationThank you for your order! 🎉 Order ID: ${GenerateID}`,
                html: html,
            }
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);

                } else {
                    console.log('send mail' + info.response)
                }
            })
        } else {
            console.log(err);
        }
    });
}