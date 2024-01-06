const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate-request.middleware');
const { createTheatreSchema } = require('./theatre.validator');
const theatreCtrl = require('./theatre.controller')

const router = require('express').Router();

const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/theatres"
    next()
}

//apis
router.get('/home', theatreCtrl.readHome);

router.route('/')
//create theatre
    .post(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(createTheatreSchema), theatreCtrl.createTheatre)
//get all theatres
    .get(checkLogin, checkPermission('admin'), theatreCtrl.readAll);

router.route('/:id')
//read theatre
    .get(checkLogin, checkPermission('admin'), theatreCtrl.readOne)
//delete theatre 
    .delete(checkLogin, checkPermission('admin'), theatreCtrl.delete)
//update theatre
    .put(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(createTheatreSchema), theatreCtrl.update);


module.exports = router