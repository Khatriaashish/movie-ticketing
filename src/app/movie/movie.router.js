const router = require('express').Router();
const CheckLogin = require('../../middlewares/auth.middleware');
const CheckPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware') ;
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const {movieSchema} = require('../movie/movie.validator')
const movieCtrl = require('../movie/movie.controller')

//upload directory setup middleware
const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/movies'
    next()
}

router.get('/home', movieCtrl.getMovieForHome);

router.route('/')
//create movie
.post(CheckLogin, CheckPermission('admin'), dirSetup, uploader.single('image'), ValidateRequest(movieSchema), movieCtrl.create)
//list all movie
.get(CheckLogin, CheckPermission(['admin', 'boxoffice']), movieCtrl.listAll);

router.route('/:id')
.get(CheckLogin, CheckPermission('admin'), movieCtrl.getDetail)
.put(CheckLogin, CheckPermission('admin'), dirSetup, uploader.single('image'), ValidateRequest(movieSchema), movieCtrl.update)
.delete(CheckLogin, CheckPermission('admin'), movieCtrl.delete)


module.exports = router