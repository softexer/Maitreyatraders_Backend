var express = require('express');
var router = express.Router();
var Seller = require('../Controllers/seller/seller');
const verifyToken = require('./VerificationToken');
var fileupload = require('express-fileupload');
router.use(fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }));
router.post('/SellerRegister', function (req, res, nex) {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: "No request content" })
    } else {
        Seller.SellerRegister(req.body, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
});
router.post('/Sellerlogin', function (req, res, nex) {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: "No request content" })
    } else {
        Seller.Sellerlogin(req.body, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.put('/SellerUpdatePassword', verifyToken,function (req, res, nex) {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: "No request content" })
    } else {
        Seller.SellerUpdatePassword(req.body, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.post('/Sellerdatafetch',verifyToken, function (req, res, nex) {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: "No request content" })
    } else {
        Seller.Sellerdatafetch(req.body, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})

router.post('/totalorders',verifyToken, function (req, res, nex) {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: "No request content" })
    } else {
        Seller.totalorders(req.body, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.post('/orderconform',verifyToken, function (req, res, nex) {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: "No request content" })
    } else {
        Seller.orderconform(req.body, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
module.exports = router;