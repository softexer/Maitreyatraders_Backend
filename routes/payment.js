var express = require('express');
var router = express.Router();

router.post('/createnewcustomer', (req, res) => {
    var Stripe_Payment_Api = require('../Controllers/Payment/Stripe_Payment_Init_Api');
    Stripe_Payment_Api.Stripe_Create_newCustomer_Payment_Api(req, res)
})

router.post('/stripepaymentinit', (req, res) => {
    var Stripe_Payment_Api = require('../Controllers/Payment/Stripe_Payment_Init_Api');
    Stripe_Payment_Api.Stripe_Payment_Api(req, res)
})
router.post('/ephemeralkeyfetch', (req, res) => {
    var Stripe_Payment_Api = require('../Controllers/Payment/Stripe_Payment_Init_Api');
    Stripe_Payment_Api.ephemeralkey(req, res)
})
router.post('/fetchstripcustomerid', (req, res) => {
    var Stripe_Payment_Api = require('../Controllers/Payment/Stripe_Payment_Init_Api');
    Stripe_Payment_Api.fetch_strip_customerID_Api(req, res)
})

module.exports = router;