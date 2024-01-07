const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const validateRequest = require('../../middlewares/validate-request.middleware');
const { createReservationSchema } = require('./reservation.validator');
const reservationCtrl = require('./reservation.controller')

const router = require('express').Router();



//apis
router.get('/home', reservationCtrl.readHome);
router.put('/checkin/:id', checkLogin, checkPermission(['admin', 'boxoffice']), reservationCtrl.checkin)
//online payment
.post('/online-payment/:id', checkLogin, checkPermission(['admin', 'customer']), reservationCtrl.onlinePayment)
//offline payment
router.post('/offline-payment/:id', checkLogin, checkPermission(['admin', 'boxoffice']), reservationCtrl.offlinePayment)

router.route('/')
//create reservation
    .post(checkLogin, checkPermission(['admin', 'customer']), validateRequest(createReservationSchema), reservationCtrl.createReservation)
//get all reservations
    .get(checkLogin, checkPermission(['admin', 'boxoffice']), reservationCtrl.readAll);

router.route('/:id')
//read reservation
    .get(checkLogin, checkPermission(['admin', 'boxoffice']), reservationCtrl.readOne)
//delete reservation 
    .delete(checkLogin, checkPermission(['admin', 'boxoffice']), reservationCtrl.delete)
//update reservation
    .put(checkLogin, checkPermission(['admin', 'boxoffice']), validateRequest(createReservationSchema), reservationCtrl.update);



module.exports = router