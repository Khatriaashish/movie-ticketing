//imports
const express = require('express');
require('../config/db.config');
const app = express();
const router = require('../routes');
const { MulterError } = require('multer');
const { ZodError } = require('zod');

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
app.use((error, req, res, next)=>{
    let code = error.code??500
    let message = error.message??"Internal Server Error"
    let result = error.result??null

    //exception
    //multer exceptions
    if(error instanceof MulterError){
        if(error.code === 'LIMIT_FILE_SIZE'){
            code = 400;
            message = error.message;
        }
    }

    //zod error handling
    if(error instanceof ZodError){
        code = 400;
        msg = {};
        
        error.errors.map((err)=>msg[err.path[0]] = err.message);

        message = "Validation failure";
        result = msg;
    }

    //mongodb error
    if(error.code === 11000){
        code = 400;
        let uniqueKeys = Object.keys(error.keyPattern)
        let msgBody = uniqueKeys.map((key)=> {
            return{
                [key]: key + 'should be unique'
            }
        })
        result = msgBody;
        message = "Validation Fail"
    }
    
    //handle
    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})

//exports
module.exports = app;