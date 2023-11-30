//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')
const bannerRouter = require('../app/banner/banner.router');
const movieRouter = require('../app/movie/movie.router');

//api
router.use('/auth', authRouter);
router.use('/banner', bannerRouter);
router.use('/movie', movieRouter);

//exports
module.exports = router;