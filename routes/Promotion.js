var express = require('express');
var router = express.Router();
router.post('/addpromotion', (req, res) => {
    var promotion_Insert_Api = require('../Controllers/Promotions/insert_promotions');
    promotion_Insert_Api.promotion_Insert_Api(req, res)
})

module.exports = router