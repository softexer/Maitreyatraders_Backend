var Joi = require('@hapi/joi');
var Customer_Model = require('../../app/Models/customer')
var config = require('../../app/ConfigFiles/config.json')
var stripe = require('stripe')(process.env.stripeSecret_key)

module.exports.Stripe_Payment_Api = async function Stripe_Payment_Api(req, res) {
    try {
      console.log("process.env.stripeSecret_key",process.env.stripeSecret_key)
        var params = req.body;
        var createPaymentInitSchema = Joi.object({
            customerID: Joi.string().required(),
             
            shipping: Joi.object({
                address: Joi.object({
                   
                    line1: Joi.string().required(),
                    postal_code: Joi.string().required(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    country: Joi.string().required()
                }),
                name: Joi.string().required(),
            }),
            description: Joi.string().required(),
            amount: Joi.string().required(),
            currencyCode: Joi.string().required(),
            paymentMethod: Joi.array().required()
        })
        var result = await createPaymentInitSchema.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        stripe.paymentIntents.create({
            shipping: params.shipping,
            description: params.description,
            amount: parseInt(params.amount),
            currency: params.currencyCode,
            payment_method_types: params.paymentMethod //'2020-08-27'
        }).then((charge) => {
            //console.log(charge);
            return res.json({
                response: 3,
                message: "Customer payment initiated successfully",
                paymentInitObject: charge
            });
        }).catch((error) => {
            console.error(error)
            return res.json({
                response: 0,
                message: error
            });
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ response: 0, message: "Internal Server error" })
    }
}

module.exports.Stripe_Create_newCustomer_Payment_Api = async function Stripe_Create_newCustomer_Payment_Api(req, res) {
    try {
        var params = req.body;
        var newStripeCustomerSchema = Joi.object({
            UserEmail: Joi.string().required(),
            phone: Joi.string().required(),
            name: Joi.string().required()
            //address: address.required()
        })
        var result = await newStripeCustomerSchema.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        stripe.customers.create({
            email: params.UserEmail,
            phone: params.phone,
            name: params.name
            //address: params.address
        }).then((customer) => {
            //console.log(customer.id)
            // Send customerId -> Save this for later use

            return res.json({
                response: 3,
                message: "Customer created successfully",
                customerId: customer.id
            });

        }).catch((err) => {
            // //console.log(err)
            return res.json({
                response: 0,
                message: "Customer created failed with stripe"
            });
        });

    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}

module.exports.ephemeralkey = async function ephemeralkey(req, res) {
    try {
        var params = req.body;
        var createEmpherelKeySchema = Joi.object({
            customerID: Joi.string().required(),
            apiVersion: Joi.string().required()
        })
        //return createEmpherelKeySchema.validate(params)
        var result = await createEmpherelKeySchema.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        stripe.customers.retrieve(params.customerID).then((customer) => {
            //console.log(customer)
            //create ephemeralKeys if match customer from stripe and database
            stripe.ephemeralKeys.create(
                { customer: params.customerID },
                { apiVersion: params.apiVersion } //'2020-08-27'
            ).then((key) => {
                //console.log(key);
                return res.json({

                    response: 3,
                    message: "Customer ephemeralKey",
                    ephemeralObject: key

                });
            }).catch((error) => {
                console.error(error)
                return res.json({

                    response: 0,
                    message: error

                });
            })
        }).catch((error) => {
            console.error(error)
            return res.json({
                response: 0,
                message: error
            });
        })

    } catch (error) {
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}

module.exports.fetch_strip_customerID_Api = async function fetch_strip_customerID_Api(req, res) {
    try {
        var params = req.body
        var fetchStripeCustomerSchema = Joi.object({
            customerID: Joi.string().required()
        })
        var result = await fetchStripeCustomerSchema.validate(params)

        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        stripe.customers.retrieve(params.customerID).then((customer) => {
            //console.log(customer)
            return res.json({

                response: 3,
                message: "Customer fetched successfully",
                customerObject: customer
            });
        }).catch((error) => {
            console.error(error)
            return res.json({
                response: 0,
                message: "Customer fetched failed"
            });
        })
    } catch (error) {
        console.log(error)
        return res.json({ response: 0, message: "Internal Server Error" })
    }
}