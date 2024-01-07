//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')
const bannerRouter = require('../app/banner/banner.router');
const movieRouter = require('../app/movie/movie.router');
const theatreRouter = require('../app/theatre/theatre.router');
const showtimeRouter = require('../app/showtime/showtime.router');
const reservationRouter = require('../app/reservation/reservation.router');
const userRouter = require('../app/user/user.router');

//api
router.use('/auth', authRouter);
router.use('/banner', bannerRouter);
router.use('/movie', movieRouter);
router.use('/showtime', showtimeRouter);
router.use('/theatre', theatreRouter);
router.use('/reservation', reservationRouter);
router.use('/user', userRouter);

//exports
module.exports = router;