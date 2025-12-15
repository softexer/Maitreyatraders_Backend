var devicetype = require('../../app/Models/devicetype');
var dbQuaries = require('../seller/sellerdbQuaries');
var FCM = require('fcm-push');
const { base } = require('../../app/Models/SellersRegister');
var sends = {
    sendNotifications: (phone, data) => {
        var devicemodulephonecheckingData = dbQuaries.devicemodulephonecheckingDataparams(phone);
        devicemodulephonecheckingData.then((found) => {
            if (found) {
                var web = found.devices[0].web;
                var mobile = found.devices[0].mobile;
                if (web.length > 0) {
                    for (var a = 0; a < web.length; a++) {
                        if (web[a].login === true) {
                            var serverkey = "AAAA9RdlVdI:APA91bF-3cIIiS9lr1Lk2fdX3pfG5ZGi_UakKnz880slQ7YPBaOLJfHYgoLXMjZYARqMovY6X-ggHXi5C8P98leuaR-AwXaYGYyqQeNbPobSI5WAanPdTo3I5zqmC08qf0N5FermZivg";
                            var fcm = new FCM(serverkey)
                            var message = {
                                to: web[a].deviceToken,
                                notification: data.notification,
                                data: data.data

                            }
                            fcm.send(message, (err, response) => {
                                if (err) {
                                    console.log("error", err)
                                } else {
                                    console.log("successfull sendNotification" + " " + response)
                                }
                            })
                        }
                    }
                }
                if (mobile.length > 0) {
                    for (var b = 0; b < mobile.length; b++) {
                        if (mobile[base].login === true) {
                            var serverkey = "AAAA9RdlVdI:APA91bF-3cIIiS9lr1Lk2fdX3pfG5ZGi_UakKnz880slQ7YPBaOLJfHYgoLXMjZYARqMovY6X-ggHXi5C8P98leuaR-AwXaYGYyqQeNbPobSI5WAanPdTo3I5zqmC08qf0N5FermZivg";
                            var fcm = new FCM(serverkey)
                            var message = {
                                to: mobile[b].deviceToken,
                                notification: data.notification,
                                data: data.data

                            }
                            fcm.send(message, (err, response) => {
                                if (err) {
                                    console.log("error", err)
                                } else {
                                    console.log("successfull sendNotification" + " " + response)
                                }
                            })
                        }
                    }
                }
               var sendnotificationinbox = dbQuaries.sendnotificationcustomerinbox(phone,data);
               sendnotificationinbox.then((inserted)=>{
                console.log("inserted")
               })
            } else {
                console.log("deviceModule Data Not found")
            }
        })
    }

}
module.exports = sends;