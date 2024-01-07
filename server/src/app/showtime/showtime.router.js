const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate-request.middleware');
const { createShowtimeSchema } = require('./showtime.validator');
const showtimeCtrl = require('./showtime.controller')

const router = require('express').Router();

const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/showtimes"
    next()
}

//apis
router.get('/home', showtimeCtrl.readHome);

router.route('/')
//create showtime
    .post(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(createShowtimeSchema), showtimeCtrl.createShowtime)
//get all showtimes
    .get(checkLogin, checkPermission('admin'), showtimeCtrl.readAll);

router.route('/:id')
//read showtime
    .get(checkLogin, checkPermission('admin'), showtimeCtrl.readOne)
//delete showtime 
    .delete(checkLogin, checkPermission('admin'), showtimeCtrl.delete)
//update showtime
    .put(checkLogin, checkPermission('admin'), validateRequest(createShowtimeSchema), showtimeCtrl.update);


module.exports = router