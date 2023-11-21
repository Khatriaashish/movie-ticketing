//imports
const router = require('express').Router();
const authCtrl = require('../auth/auth.controller');
const {registerSchema} = require('../auth/auth.validator');
const uploader = require('../../middlewares/uploader.middleware');
const validateRequest = require('../../middlewares/validate-request.middleware');

//Upload directory setup middleware
const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users';
    next();
}

//apis
router.post('/register', dirSetup, uploader.single('image'), validateRequest(registerSchema), authCtrl.register);

//exports
module.exports = router;