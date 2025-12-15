var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
const verifyToken = require('./VerificationToken');
var products = require('../Controllers/sellerProducts/products')
router.use(fileupload({ limits: { fieldSize: 50 * 1024 * 1024 } }));

router.post('/productinsert', verifyToken,(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        var productdata = JSON.parse(req.body.productInfo);
        products.productinsert(productdata, req, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
})
router.put('/productupdate', verifyToken,(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        var productdata = JSON.parse(req.body.updateproductInfo);
        products.productupdate(productdata, req, (result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
    
})
router.post('/productfetch',verifyToken, (req, res, next) => {
    console.log(req.body)
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        products.productfetch(req.body,(result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
})
router.delete('/productdelete',verifyToken, (req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        products.productdelete(req.body,(result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
})
router.post('/customersearchproducts',(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        products.customersearchproducts(req.body,(result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
})
module.exports = router;