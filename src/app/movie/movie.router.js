const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate-request.middleware');
const { createMovieSchema } = require('./movie.validator');
const movieCtrl = require('./movie.controller')

const router = require('express').Router();

const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/movies"
    next()
}

//apis
router.get('/home', movieCtrl.readHome);

router.route('/')
//create movie
    .post(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(createMovieSchema), movieCtrl.createMovie)
//get all movies
    .get(checkLogin, checkPermission('admin'), movieCtrl.readAll);

router.route('/:id')
//read movie
    .get(checkLogin, checkPermission('admin'), movieCtrl.readOne)
//delete movie 
    .delete(checkLogin, checkPermission('admin'), movieCtrl.delete)
//update movie
    .put(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(createMovieSchema), movieCtrl.update);


module.exports = router