var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
const verifyToken = require('./VerificationToken');
var category = require('../Controllers/Category/category');
router.use(fileupload({limits:{fileSize:50*1024*1024}}));

router.post('/categoryinsert',verifyToken,function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        var requiredData = JSON.parse(req.body.categoryInfo);
        category.categoryinsert(requiredData,req,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.put('/categoryupdate',verifyToken,function(req,res,next){

    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        var requiredData = JSON.parse(req.body.updateCategoryInfo);
        category.categoryupdate(requiredData,req,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.post('/fetchcategorys',function(req,res,next){
    var fetchCategory = require('../Controllers/Category/fetchCategory')
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        fetchCategory.fetchcategorys(req.body,res,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.put('/subcategoryinsert',verifyToken,function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        var requiredData = JSON.parse(req.body.subCategoryInfo);
        category.subcategoryinsert(requiredData,req,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.put('/subcategoryupdate',verifyToken,function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        var requiredData = JSON.parse(req.body.subCategoryupdateInfo);
        category.subcategoryupdate(requiredData,req,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.post('/subcategoryfetch',function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        category.subcategoryfetch(req.body,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.put('/subcategorypulldata',verifyToken,function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        category.subcategorypulldata(req.body,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
router.delete('/categoriesDelete',verifyToken,function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'No request content'})
    }else{
        category.categoriesDelete(req.body,(result)=>{
            if(result.status ===400){
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message)
                return;
            }
            res.json(result.data)
        })
    }
})
module.exports = router