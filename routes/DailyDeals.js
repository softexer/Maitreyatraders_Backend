var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
const verifyToken = require('./VerificationToken');
var todaydeals = require('../Controllers/Dailydeals/deals')
router.use(fileupload({ limits: { fieldSize: 50 * 1024 * 1024 } }));

router.post('/insert', verifyToken,(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        var productdata = JSON.parse(req.body.productInfo);
        todaydeals.todaydealsinsert(productdata, req, (result) => {
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
router.put('/update', verifyToken,(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        var productdata = JSON.parse(req.body.updateproductInfo);
        todaydeals.todaydealsupdate(productdata, req, (result) => {
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
router.post('/fetch',verifyToken, (req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        todaydeals.todaydealsfetch(req.body,(result) => {
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
router.delete('/delete',verifyToken, (req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        todaydeals.todaydealsdelete(req.body,(result) => {
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