var express = require ('express');
var router = express.Router();
var fileupload = require('express-fileupload');
var verifyToken  = require('./VerificationToken');
var orders = require('../Controllers/orders/orders')
router.use(fileupload({limits:{fileSize:50*1024*1024}}));

router.post('/insert',verifyToken,(req,res,next)=>{
    if(typeof req.body  === 'undefined'){
        res.json({result:'0',message:'no request content'})
    }else{
        orders.ordersinsert(req.body,(result)=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return 
            }
            res.json(result.data)
        })
    }
})
router.post('/myorders',verifyToken,(req,res,next)=>{
    if(typeof req.body  === 'undefined'){
        res.json({result:'0',message:'no request content'})
    }else{
        orders.myorders(req.body,(result)=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return 
            }
            res.json(result.data)
        })
    }
})

router.delete('/myorderdelete',verifyToken,(req,res,next)=>{
    if(typeof req.body  === 'undefined'){
        res.json({result:'0',message:'no request content'})
    }else{
        orders.myorderdelete(req.body,(result)=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return 
            }
            res.json(result.data)
        })
    }
})
router.put('/myordercancel',verifyToken,(req,res,next)=>{
    if(typeof req.body  === 'undefined'){
        res.json({result:'0',message:'no request content'})
    }else{
        orders.myordercancel(req.body,(result)=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return 
            }
            res.json(result.data)
        })
    }
})
module.exports = router;
