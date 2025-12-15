var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
var contacts = require('../Controllers/contactus/contact');
router.use(fileupload({limits:{fileSize:50*1024*1024}}))
router.post('/contactUs',function(req,res,next){
    if(typeof req.body ==='undefined'){
        res.json({result:'0',message:'no request content'})
    }else{
        contacts.insertContactus(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status;
                res.send(result.data.message)
                return ;
            }
            res.json(result.data)
        })
    }
})
module.exports = router