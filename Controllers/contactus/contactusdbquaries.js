var Contactus = require('../../app/Models/ContactUs')
var contactusDBquaries = {
    contactusdatainserted: (params) => {
        var date = new Date().getTime();
        var insertcontactus = new Contactus({
            name: params.name,
            emailAddress: params.emailAddress,
            Message: params.Message,
            merchantId: params.merchantId,
            userId: params.userId,
            timeContact:date
        })
        return insertcontactus
    }
}
module.exports = contactusDBquaries;