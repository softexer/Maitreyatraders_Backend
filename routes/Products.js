var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');

const verifyToken = require('./VerificationToken');
router.use(fileupload({ limits: { fileSize: 500 * 1024 * 1024 } }));

router.post('/addproduct', verifyToken, async (req, res) => {
    var Add_Project = require('../Controllers/Products/Add_Product_Api');
    Add_Project.Add_Project(req, res)

})

module.exports = router;

