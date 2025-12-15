var nodemailer = require("nodemailer");
var fs = require("fs");
var config = require("../../app/ConfigFiles/config.json");

var mail = {
  userForgotPasswordOTPSentToMail: function (subject, toEmail, otp) {
    fs.readFile('./app/ConfigFiles/ForgotPassword.html', function (err, data) {
      if (!err) {
        var str = data.toString();
        var html = str.replace("%s", otp);
        sendOTPTOMail(toEmail, subject, html);
      }
      else {
        console.log(err);
      }
    });
  },
  sendMailorderstatuspurpose:(subject,found,gmail)=>{

    orderStatussendMail(subject, gmail)
  },
  sendPasswordResetLink: function (subject, toEmail, resetLink) {
    fs.readFile("./app/configFiles/ResetPassword.html", function (err, data) {
      if (!err) {
        var html = data.toString();
        html = replaceAll(html, "#RESET_LINK#", resetLink);
        //var html = str.replace("#RESET_LINK#", resetLink);
        // var html1 = html.replace("#RESET_LINK#", resetLink);
        sendMail(toEmail, subject, html);
      } else {
        console.log(err);
      }
    });
  },
  passwordChangeSuccess: function (subject, toEmail, email) {
    fs.readFile("./app/configFiles/ChangePassword.html", function (err, data) {
      if (!err) {
        var html1 = data.toString();
        html1 = html1.replace("#USERNAME#", toEmail);
        html1 = html1.replace("#CONTACTUS_LINK", email);
        sendMail(toEmail, subject, html1);
      } else {
        console.log(err);
      }
    });
  },
  sendInvoiceToClient: (emailObject, htmlData) => {
    fs.readFile("./app/configFiles/invoiceTemplate.html", function (err, data) {
      if (!err) {
        var html1 = data.toString();
        html1 = html1.replace("#USERNAME#", htmlData.userName);
        html1 = html1.replace("#txnAmount#", htmlData.txnAmount);
        html1 = html1.replace("#CONTACTUS_LINK", htmlData.contactUS);
        sendMail(emailObject.toEmail, emailObject.subject, html1, emailObject.attachments, emailObject.mailFileName);
      } else {
        console.log(err);
      }
    });
  },
  sendInvoiceToMember: (memberHtmlData, memberEmailData) => {
    fs.readFile("./app/configFiles/memberInvoice.html", function (err, data) {
      if (!err) {
        var html1 = data.toString();
        html1 = html1.replace("#USERNAME#", memberHtmlData.userName);
        html1 = html1.replace("#txnAmount#", memberHtmlData.txnAmount);
        html1 = html1.replace("#donarName#", memberHtmlData.donarName);
        sendMail(memberEmailData.toEmail, memberEmailData.subject, html1, memberEmailData.attachments, memberEmailData.mailFileName);
      } else {
        console.log(err);
      }
    });
  },
  sendOfflineInvoiceToClient: (emailObject, htmlData) => {
    fs.readFile("./app/configFiles/offlineinvoiceTemplate.html", function (err, data) {
      if (!err) {
        var html1 = data.toString();
        html1 = html1.replace("#USERNAME#", htmlData.userName);
        html1 = html1.replace("#txnAmount#", htmlData.txnAmount);
        html1 = html1.replace("#CONTACTUS_LINK", htmlData.contactUS);
        html1 = html1.replace('#InvoiceID#', htmlData.invoiceID);
        sendMail(emailObject.toEmail, emailObject.subject, html1);
      } else {
        console.log(err);
      }
    });
  },
  sendOfflineMemberInvoice: (memberHtmlData, memberEmailData) => {
    fs.readFile("./app/configFiles/memberOfflineInvoice.html", function (err, data) {
      if (!err) {
        var html1 = data.toString();
        html1 = html1.replace("#USERNAME#", memberHtmlData.userName);
        html1 = html1.replace("#txnAmount#", memberHtmlData.txnAmount);
        html1 = html1.replace('#InvoiceID#', memberHtmlData.invoiceID);
        html1 = html1.replace('#donarName#', memberHtmlData.donarName);
        sendMail(memberEmailData.toEmail, memberEmailData.subject, html1);
      } else {
        console.log(err);
      }
    });
  }
}
function sendMail(toEmail, subject, html1, attachments, mailFileName) {
  var transporter = nodemailer.createTransport({
    service: 'gmail.com',
    name: "SMTP",
    secure: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'sreekasivisweshwaraalayauser@gmail.com',
      pass: 'gjssvtlzimeuzriy'
    }
  });
  var mailOptions = {
    from: 'sreekasivisweshwaraalayauser@gmail.com',
    to: toEmail,
    subject: subject,
    html: html1,
  };
  if (typeof attachments !== "undefined") {
    mailOptions = {
      from: 'sreekasivisweshwaraalayauser@gmail.com',
      to: toEmail,
      subject: subject,
      html: html1,
      attachments: [
        {
          filename: mailFileName, // <= Here: made sure file name match
          path: attachments, // <= Here
          contentType: 'application/pdf'
        }]
    };
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function sendOTPTOMail(toEmail, subject, html) {
  var transporter = nodemailer.createTransport({
    service: 'gmail.com',
    name: "SMTP",
    secure: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'sreekasivisweshwaraalayauser@gmail.com',
      pass: 'gjssvtlzimeuzriy'
    }
  });
  var mailOptions = {
    from: 'sreekasivisweshwaraalayauser@gmail.com',
    to: toEmail,
    subject: subject,
    html: html
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function orderStatussendMail(subject, gmail) {
  var transporter = nodemailer.createTransport({
    service: 'gmail.com',
    name: "SMTP",
    secure: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'sreekasivisweshwaraalayauser@gmail.com',
      pass: 'gjssvtlzimeuzriy'
    }
  });
  var mailOptions = {
    from: 'sreekasivisweshwaraalayauser@gmail.com',
    to: gmail,
    subject: subject,
    html: html
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = mail;
