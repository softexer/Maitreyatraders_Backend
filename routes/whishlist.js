var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
const verifyToken = require('./VerificationToken');
var todaydeals = require('../Controllers/whishlist/whishlist')
router.use(fileupload({ limits: { fieldSize: 50 * 1024 * 1024 } }));

router.post('/insert',(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        todaydeals.whishlistinsert(req.body,(result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
})
router.get('/fetch',(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        todaydeals.whishlistfetch(req.query,(result) => {
            if (result.status === 400) {
                console.log(result)
                res.statusCode = result.status;
                res.send(result.data.message);
                return
            }
            res.json(result.data)
        })
    }
})
router.delete('/delete',(req, res, next) => {
    if (typeof req.body === 'undefined') {
        res.json({ result: '0', message: 'no request content' })
    } else {
        todaydeals.whishlistdelete(req.body,(result) => {
            if (result.status === 400) {
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