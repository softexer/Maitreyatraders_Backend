var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
const verifyToken = require('./VerificationToken');
router.use(fileupload({limits:{fileSize:50*1024*1024}}));
var Vmart = require('../Controllers/vmartAddress/vmart')

router.post('/insertvmartaddress',verifyToken,function(req,res){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'request no content'})
    }else{
        Vmart.insertvmartaddress(req.body,result=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode=result.status;
                res.send(result.data.message);
                return ;
            }
            res.json(result.data)
        })
    }
})
router.get('/fetchvmartaddress',verifyToken,function(req,res){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'request no content'})
    }else{
        Vmart.fetchvmartaddress(req.query,result=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode=result.status;
                res.send(result.data.message);
                return ;
            }
            res.json(result.data)
        })
    }
});
router.put('/updatevmartaddress',verifyToken,function(req,res){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'request no content'})
    }else{
        Vmart.updatevmartaddress(req.body,result=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode=result.status;
                res.send(result.data.message);
                return ;
            }
            res.json(result.data)
        })
    }
});
router.delete('/deletevmartaddress',verifyToken,function(req,res){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'request no content'})
    }else{
        Vmart.deletevmartaddress(req.body,result=>{
            if(result.status === 400){
                console.log(result)
                res.statusCode=result.status;
                res.send(result.data.message);
                return ;
            }
            res.json(result.data)
        })
    }
});
module.exports = router