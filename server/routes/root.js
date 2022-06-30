const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});
router.get('/hello(.html)?', (req,res,next)=>{
    console.log('attempted to load hello.html');
    next();
}, (req,res) => {
    res.send('Hello, from server.js!')
});

module.exports = router;