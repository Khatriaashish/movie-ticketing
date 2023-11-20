//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')

//api
router.use('/auth', authRouter);

//exports
module.exports = router;