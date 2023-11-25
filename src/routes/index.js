//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')
const bannerRouter = require('../app/bannner/banner.router');

//api
router.use('/auth', authRouter);
router.use('/banner', bannerRouter);

//exports
module.exports = router;