const router = require('express').Router();
const checkLogin = require('../../middlewares/auth.middleware')
const checkPermission = require('../../middlewares/rbac.middleware');
const userCtrl = require('./user.controller');
const { createStaffSchema, changePasswordSchema } = require('./user.validator');
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate-request.middleware')

router.get('/by-role/:role', checkLogin, checkPermission('admin'), userCtrl.getByRole);
router.get('/by-status/:status', checkLogin, checkPermission('admin'), userCtrl.getByStatus);

const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users';
    next()
}
router.route('/')
    //read all user
    .get(
        checkLogin,
        checkPermission('admin'),
        userCtrl.listAllUsers
    )
    //create staff
    .post(
        checkLogin,
        checkPermission('admin'),
        dirSetup, 
        uploader.single('image'), 
        validateRequest(createStaffSchema), 
        userCtrl.createStaff
    )

//delete User
router.route('/:id')
    .delete(
        checkLogin,
        checkPermission('admin'),
        userCtrl.deleteUser
    )

router.post('/change-password', 
    checkLogin, 
    validateRequest(changePasswordSchema), 
    userCtrl.changePassword);

router.post('/change-picture', 
    checkLogin, 
    dirSetup,
    uploader.single('image'),
    userCtrl.changePicture);

module.exports = router