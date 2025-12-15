var express = require('express');
var router = express.Router();
const fileUpload = require("express-fileupload");
const verifyToken = require('./VerificationToken');
var customerADD = require('../Controllers/customersaddress/customaddress')
router.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);

router.post('/insertuseraddress', function (req, res) {
    if (typeof req.body === 'undefined') {
        res.json({ result: "0", message: "No request Content" })
    } else {
        customerADD.useraddressaddData(req.body, (result) => {
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
router.put('/updateuseraddress',function (req, res) {
    if (typeof req.body === 'undefined') {
        res.json({ result: "0", message: "No request Content" })
    } else {
        customerADD.useraddressupdateDataupdateData(req.body, (result) => {
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
router.delete('/deleteuseraddress',function (req, res) {
    if (typeof req.body === 'undefined') {
        res.json({ result: "0", message: "No request Content" })
    } else {
        customerADD.useraddressdeleteData(req.body, (result) => {
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
router.get('/fetchuseraddress',function (req, res) {
    if (typeof req.body === 'undefined') {
        res.json({ result: "0", message: "No request Content" })
    } else {
        customerADD.useraddressfectchData(req.query, (result) => {
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
router.put('/customerdefaultaddress',function (req, res) {
    if (typeof req.body === 'undefined') {
        res.json({ result: "0", message: "No request Content" })
    } else {
        customerADD.customerdefaultaddress(req.body,(result) => {
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
