var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');

const verifyToken = require('./VerificationToken');
router.use(fileupload({ limits: { fileSize: 500 * 1024 * 1024 } }));

router.post('/addproduct', async (req, res) => {
    var Add_Project = require('../Controllers/Products/Add_Product_Api');
    Add_Project.Add_Project(req, res)

})
router.put('/updateproduct', async (req, res) => {
    var Update_Product_Api = require('../Controllers/Products/Update_Product_Api');
    Update_Product_Api.Update_Product_Api(req, res)

})
router.post('/fetchproduct', async (req, res) => {
    var Fetch_Product_Api = require('../Controllers/Products/Fetch_Product_Api');
    Fetch_Product_Api.Fetch_Product_Api(req, res)
})

router.delete('/deleteproduct', async (req, res) => {
    var Delete_Product_Api = require('../Controllers/Products/Delete_Product');
    Delete_Product_Api.Delete_Product_Api(req, res)
})
//customers product data fetch
router.post('/productlist', async (req, res) => {
    var Customer_Products_List = require('../Controllers/Products/Customer_Products_List');
    Customer_Products_List.Customer_Products_List(req, res)
})
router.post('/singleproduct', async (req, res) => {
    var Customer_Products_List = require('../Controllers/Products/Customer_Products_List');
    Customer_Products_List.singleproduct(req, res)
})

router.get('/fetchcategories', async (req, res) => {
    var Customer_Fetch_Categories_Api = require('../Controllers/Products/Customer_Fetch_Categories_Api');
    Customer_Fetch_Categories_Api.Customer_Fetch_Categories_Api(req, res)
})
router.get('/customerhomepage', async (req, res) => {
    var Customer_Home_page_Api = require('../Controllers/Products/Customer_Home_page_Api')
    Customer_Home_page_Api.Customer_Home_page_Api(req, res)
})
router.post('/ordersfetch', async (req, res) => {
    var Customer_Orders_Fetch = require('../Controllers/Products/Customer_Orders_Fetch');
    Customer_Orders_Fetch.Customer_Orders_Fetch(req, res)
})


router.get('/', async (req, res) => {
    var Orders_Model = require('../app/Models/Mohan');
    var daystart = new Date();
    daystart.setHours(0, 0, 0, 0);
    var endDay = new Date()
    endDay.setHours(23, 59, 59, 999);
    console.log(daystart, endDay)

    var result = await Orders_Model.find({ timestamp: { $gte: daystart, $lte: endDay } })
    return res.json({
        response: 3, message: "order fetch data",
        OrderData: result
    })
})


module.exports = router;

