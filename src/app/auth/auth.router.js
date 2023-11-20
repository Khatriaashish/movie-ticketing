//imports
const router = require('express').Router();
const authCtrl = require('../auth/auth.controller')

//Upload directory setup middleware
const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users'
}

//apis
router.post('/register', dirSetup, authCtrl.register);

//exports
module.exports = router;