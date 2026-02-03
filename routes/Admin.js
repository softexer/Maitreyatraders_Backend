var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload')
router.use(fileupload({ limits: { fileSize: 100 * 1024 * 1024 } }))

router.post('/signup', (req, res) => {
    var Admin_Signup_Api = require('../Controllers/Admin/Admin_Register');
    Admin_Signup_Api.Admin_Signup_Api(req, res)
})
router.post('/login', (req, res) => {
    var Admin_Login_Api = require('../Controllers/Admin/Admin_Login_Api');
    Admin_Login_Api.Admin_Login_Api(req, res)
})
router.put('/changepassword', (req, res) => {
    var Admin_Changed_Password_Api = require('../Controllers/Admin/Admin_Change_Password');
    Admin_Changed_Password_Api.Admin_Changed_Password_Api(req, res)
})
router.put('/signout', (req, res) => {
    var Admin_Signout_Api = require('../Controllers/Admin/Admin_Signout');
    Admin_Signout_Api.Admin_Signout_Api(req, res)
})

//Admin DashBoard
router.post('/dashboard', (req, res) => {
    var Admin_Dash_Board_Api = require('../Controllers/Admin/Admin_Dash_Board_Api');
    Admin_Dash_Board_Api.Admin_Dash_Board_Api(req, res)

})

//Admin Accept or Reject New Orders
router.post('/acceptorrejectorder', (req, res) => {
    var Admin_Accept_Or_Reject_New_Order_Api = require('../Controllers/Admin/Admin_Accept_Or_Reject_New_Order_Api');
    Admin_Accept_Or_Reject_New_Order_Api.Admin_Accept_Or_Reject_New_Order_Api(req, res)
})

//Orders List
router.post('/orderslist', (req, res) => {
    var Admin_Orders_List_Api = require('../Controllers/Admin/Admin_Orders_List');
    Admin_Orders_List_Api.Admin_Orders_List_Api(req, res)

})

//Add Tracking details and Shipping start
router.post('/addtrackingdetails', (req, res) => {
    var Admin_Add_Tracking_Details_Api = require('../Controllers/Admin/Admin_Add_tracking_details');
    Admin_Add_Tracking_Details_Api.Admin_Add_Tracking_Details_Api(req, res)
})

//Delivered Order api
router.post('/orderdelivered', (req, res) => {
    var Admin_Add_Tracking_Details_Api = require('../Controllers/Admin/Admin_Add_tracking_details');
    Admin_Add_Tracking_Details_Api.Admin_Mark_As_Delivered_Api(req, res)
})

//Products Search api
router.get('/productsearch', (req, res) => {
    var Admin_Product_Search_Api = require('../Controllers/Admin/Admin_Add_tracking_details');
    Admin_Product_Search_Api.Admin_Product_Search_Api(req, res)
})

router.post('/dropdownproducts', (req, res) => {
    var Admin_Dropdown_Products_Api = require('../Controllers/Admin/Admin_Dropdown_Products_Api');
    Admin_Dropdown_Products_Api.Admin_Dropdown_Products_Api(req, res)
})

router.post('/updatepoliciesfiles', (req, res) => {
    var Admin_Update_Policies_Files_Api = require('../Controllers/Admin/Admin_Update_Policies_Files_Api');
    Admin_Update_Policies_Files_Api.Admin_Update_Policies_Files_Api(req, res)
})

router.post('/adminfetch', (req, res) => {
    var Admin_Fetch_Api = require('../Controllers/Admin/Admin_Fetch_Api');
    Admin_Fetch_Api.Admin_Fetch_Api(req, res)
})
module.exports = router