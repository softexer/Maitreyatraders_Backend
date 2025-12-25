var express = require('express');
var router = express.Router();
const fileUpload = require("express-fileupload");
const verifyToken = require('./VerificationToken');
router.use(
    fileUpload({
        limits: { fileSize: 500 * 1024 * 1024 },
    })
);

router.post('/addtocart', verifyToken, async (req, res) => {
    var Add_Cart_Api = require('../Controllers/Cart_Apis/Add_Cart_Api')
    Add_Cart_Api.Add_Cart_Api(req, res)
})

// router.post('/addcart',function (req, res) {
//     if (typeof req.body === 'undefined') {
//         res.json({ result: "0", message: "No request Content" })
//     } else {
//         cart.cartaddData(req.body, (result) => {
//             console.log(result);
//             if (result.status === 400) {
//                 res.statusCode = result.status;
//                 res.send(result.data.message)
//                 return;

//             }
//             res.json(result.data)
//         })
//     }
// })
// router.put('/updatecart',function (req, res) {
//     if (typeof req.body === 'undefined') {
//         res.json({ result: "0", message: "No request Content" })
//     } else {
//         cart.cartupdateData(req.body, (result) => {
//             console.log(result)
//             if (result.status === 400) {
//                 res.statusCode = result.status;
//                 res.send(result.data.message)
//                 return;

//             }
//             res.json(result.data)
//         })
//     }
// })
// router.delete('/deletecart', function (req, res) {
//     if (typeof req.body === 'undefined') {
//         res.json({ result: "0", message: "No request Content" })
//     } else {
//         cart.cartdeleteData(req.body, (result) => {
//             console.log(result)
//             if (result.status === 400) {
//                 res.statusCode = result.status;
//                 res.send(result.data.message)
//                 return;

//             }
//             res.json(result.data)
//         })
//     }
// })
// router.get('/cart',function (req, res) {
//     //console.log(req)
//     if (typeof req.body === 'undefined') {
//         res.json({ result: "0", message: "No request Content" })
//     } else {
//         console.log(req.query)
//         cart.cartfectchData(req.query, (result) => {
//             if (result.status === 400) {
//                 console.log(result)
//                 res.statusCode = result.status;
//                 res.send(result.data.message)
//                 return;

//             }
//             res.json(result.data)
//         })
//     }
// })
// router.delete('/cartdataDeleteall',function (req, res) {
//     if (typeof req.body === 'undefined') {
//         res.json({ result: "0", message: "No request Content" })
//     } else {
//         cart.cartdataDeleteall(req.body, (result) => {
//             console.log(result)
//             if (result.status === 400) {
//                 res.statusCode = result.status;
//                 res.send(result.data.message)
//                 return;

//             }
//             res.json(result.data)
//         })
//     }
// })

module.exports = router;
