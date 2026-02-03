var express = require('express');
var router = express.Router();
var Advertisement = require('../Controllers/advertisement/advertisement');
const fileUpload = require("express-fileupload");
var verifyToken = require('./VerificationToken')
router.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);
router.post('/insertadvertisement', async (req, res) => {
    Advertisement.insertadvertisement(req, res)
})
router.put('/updateadvertisement', async (req, res) => {
    Advertisement.updateadvertisement(req, res)
})
router.post('/fetchadvertisement', async (req, res) => {
    Advertisement.fetchadvertisement(req, res)
})
router.delete('/deleteadvertisement', async (req, res) => {
    Advertisement.deleteadvertisement(req, res)
})

module.exports = router;