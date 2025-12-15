var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
const verifyToken = require('./VerificationToken');
var dashboaard = require('../Controllers/dashboard/dashboard')
router.use(fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }));

router.post('/dashboardinsert', verifyToken, (req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        var productdata = JSON.parse(req.body.dashboardInfo);
        dashboaard.dashboardinsert(productdata, req, (result) => {
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
router.put('/dashboardupdate', verifyToken, (req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        console.log(req.files)
        var productdata = JSON.parse(req.body.dashboardInfo);
        dashboaard.dashboardupdate(productdata, req, (result) => {
            
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
router.put('/dashboardremoveinserdata', verifyToken, (req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        dashboaard.dashboardremoveinserdata(req.body, (result) => {
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