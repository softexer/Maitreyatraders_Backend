var express = require("express");
var router = express.Router();
var verifyToken = require("./VerificationToken");
const fileUpload = require("express-fileupload");
var Customer = require("../Controllers/customer/customer");


router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// router.post("/customerRegister", function (req, res, next) {
//   console.log("req body...", req.body);
//   if (typeof req.body === "undefined") {
//     res.json({ result: "0", message: "no request content" });
//   } else {
//     Customer.RegisterCustomer(req.body, (result) => {
//       console.log("result", result.status);
//       if (result.status === 400) {
//         console.log(result)
//         res.statusCode = result.status;
//         res.send(result.data.message);
//         return;
//       }
//       res.json(result.data);
//     });
//   }
// });
// router.post("/login", function (req, res, next) {
//     console.log("req body...", req.body);
//     if (typeof req.body === "undefined") {
//       res.json({ result: "0", message: "no request content" });
//     } else {
//       Customer.verifyCustomer(req.body, (result) => {
//         console.log("result", result.status);
//         if (result.status === 400) {
//           console.log(result)
//           res.statusCode = result.status;
//           res.send(result.data.message);
//           return;
//         }
//         res.json(result.data);
//       });
//     }
//   });
//   router.post("/fetch", function (req, res, next) {
//     console.log("req body...", req.body);
//     if (typeof req.body === "undefined") {
//       res.json({ result: "0", message: "no request content" });
//     } else {
//       Customer.signupCustomer(req.body, (result) => {
//         console.log("result", result.status);
//         if (result.status === 400) {
//           console.log(result)
//           res.statusCode = result.status;
//           res.send(result.data.message);
//           return;
//         }
//         res.json(result.data);
//       });
//     }
//   });
//   router.post("/signout", verifyToken, function (req, res, next) {
//     if (typeof req.body === "undefined") {
//       res.statusCode = 400;
//       res.json({ result: "0", message: "no request content" });
//     } else {
//       Customer.signout(req.body, (result) => {
//         //console.log("result", result.status);
//         //console.log(result)
//         if (result.status === 400) {
//           console.log(result)
//           res.statusCode = result.status;
//           res.send(result.data.message);
//           return;
//         }
//         res.json(result.data);
//       });
//     }
//   });
//   router.post("/getPaytmTxnToken", (req, res) => {
//     if(typeof req.body === 'undefined'){
//       res.json({result:'0',message:'no request content'});
//     }else{
//       Customer.getPaytmTxnToken(req.body,(result) => {
//         //console.log('result',result.status);
//         if(result.status === 400) {
//           res.statusCode = result.status;
//           res.send(result.data.message);
//           return;
//         }
//         res.json(result.data);
//       });
//     }
//   });



// New api

router.post('/login', (req, res) => {
  var Customer_Login = require('../Controllers/customer/Customer_Login_Api');
  Customer_Login.Customer_Login(req, res)
})
module.exports = router