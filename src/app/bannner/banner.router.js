const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const bannerCtrl = require('../bannner/banner.controller');
const { bannerSchema } = require('./banner.validator');
const router = require('express').Router();
const validateRequest = require('../../middlewares/validate-request.middleware')

//directory setup for image upload
const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/banners';
    next()
}

//apis
router.get('/home', bannerCtrl.readHome);

router.route('/')
.post(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(bannerSchema), bannerCtrl.create)
.get(checkLogin, checkPermission('admin'), bannerCtrl.readAll);

router.route('/:id')
.get(checkLogin, checkPermission('admin'), bannerCtrl.readOne)
.delete(checkLogin, checkPermission('admin'), bannerCtrl.delete)
.put(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(bannerSchema), bannerCtrl.update);


module.exports = router;