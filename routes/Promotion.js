var express = require('express');
var router = express.Router();
router.post('/addpromotion', (req, res) => {
    var promotion_Insert_Api = require('../Controllers/Promotions/insert_promotions');
    promotion_Insert_Api.promotion_Insert_Api(req, res)
})
router.put('/updatepromotion', (req, res) => {
    var promotion_Update_Api = require('../Controllers/Promotions/update_promtions');
    promotion_Update_Api.promotion_Update_Api(req, res)
})
router.put('/fetchpromotion', (req, res) => {
    var promotion_Fetch_Api = require('../Controllers/Promotions/fetch_promotions');
    promotion_Fetch_Api.promotion_Fetch_Api(req, res)
})
router.delete('deletepromotion', (req, res) => {
    var promotion_Delete_Api = require('../Controllers/Promotions/delete_promotions');
    promotion_Delete_Api.promotion_Delete_Api(req, res)
})
module.exports = router