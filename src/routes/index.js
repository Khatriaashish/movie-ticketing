//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')
const bannerRouter = require('../app/banner/banner.router');
const movieRouter = require('../app/movie/movie.router');
const theatreRouter = require('../app/theatre/theatre.router');

//api
router.use('/auth', authRouter);
router.use('/banner', bannerRouter);
router.use('/movie', movieRouter);
router.use('/theatre', theatreRouter);

//exports
module.exports = router;