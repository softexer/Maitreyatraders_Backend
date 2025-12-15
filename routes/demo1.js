
// var express = require('express');
// var router = express.Router();
// var fileupload = require('express-fileupload');
// var verifyToken = require('./VerificationToken');
// var Joi = require('@hapi/joi');
// var whishData = require('../app/Models/whishlist')
// var sellerProducts = require('../app/Models/sellerProducts');
// var ids = require('../Controllers/Core/cartID')
// router.use(fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }))

// router.post('/insert', verifyToken, (req, res, next) => {
//     if (typeof req.body === 'undefined') {
//         res.json({ result: '0', message: 'no request content' })
//     } else {
//         var params = req.body;

//         function testing(params) {
//             var validates = Joi.object({
//                 PhoneNumber: Joi.string().required(),
//                 ProductID: Joi.string().required(),
//             })
//             return validates.validate(params);

//         }
//         var { error } = testing(params);
//         if (error) {
//             datas = {
//                 result: 400,
//                 response: 0,
//                 message: error.details[0].message
//             }
//             res.statusCode = 400
//             res.send(datas)
//         }
//         var sellerfetch = sellerProducts.findOne({ ProductID: params.ProductID })
//         sellerfetch.then((found) => {
//             //console.log(found)
//             if (found) {
//                 var whishlistdatachecking = whishData.findOne({ PhoneNumber: params.PhoneNumber, ProductID: params.ProductID });
//                 whishlistdatachecking.then((founded) => {
//                     if (founded) {
//                         var count = founded.countViews;
//                         var c = 1;
//                         var countupdate = whishData.updateOne({ PhoneNumber: params.PhoneNumber, ProductID: params.ProductID },
//                             { $set: { countViews: count + c } });
//                         countupdate.then((updated) => {
//                             console.log(updated)
//                             if (updated) {
//                                 var data = {
//                                     response: 3,
//                                     message: "whishlist updated successfully"
//                                 }
//                                 res.json(data)
//                             } else {
//                                 var data = {
//                                     response: 0,
//                                     message: "whishlist updated Failure"
//                                 }
//                                 res.json(data)
//                             }
//                         })
//                     } else {
//                         var id = ids.cartID(7);
//                         var date = new Date().getTime();
//                         var insertwishlist = new whishData({
//                             whishlistID: id,
//                             PhoneNumber: params.PhoneNumber,
//                             ProductID: params.ProductID,
//                             ProductName: found.ProductName,
//                             timeStamp: date,
//                             image: found.ProductImage
//                         })

//                         insertwishlist.save((inserted) => {
//                             console.log(inserted)
//                             if (!inserted) {
//                                 var data = {
//                                     response: 3,
//                                     message: "whishlist inserted successfully"
//                                 }
//                                 res.json(data)
//                             } else {
//                                 var data = {
//                                     response: 0,
//                                     message: "whishlist inserted Failure"
//                                 }
//                                 res.json(data)
//                             }
//                         })
//                     }
//                 })
//             } else {
//                 var data = {
//                     response: 0,
//                     message: "No data found"
//                 }
//                 res.json(data)
//             }
//         })
//     }
// })
// router.post('/fetch',verifyToken,(req,res,next)=>{
//     if(typeof req.body ==='undefined'){
//         res.json({result:'0',message:'no request content'})
//     }else{
//         var params = req.body
//         try {
//             function fetchvalidate(params){
//                 var fetchdata = Joi.object({
//                     PhoneNumber:Joi.string().required
//                 })
//                 return fetchdata.validate(params)
//             }
//             var {error}= fetchvalidate(params);
//            if(error){
             
//            }else{

//            }
//         } catch (error) {
            
//         }
//     }
// })
// module.exports = router