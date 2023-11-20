//imports
const express = require('express');
require('../config/db.config');
const app = express();
const router = require('../routes')

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//api
app.use('/api/v1', router);

//404 handling
app.use((req, res, next)=>{
    res.status(404).json({
        result: null,
        message: 'Page not found',
        meta: null
    })
})

//exception handling
app.use((err, req, res, next)=>{
    let code = err.code??500
    let message = err.message??"Internal Server Error"
    let result = err.result??null

    //exception

    //handle
    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})

//exports
module.exports = app;