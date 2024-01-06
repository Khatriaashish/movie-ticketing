const reservationSvc = require("./reservation.service");
const movieSvc = require("../movie/movie.service")
const showtimeSvc = require("../showtime/showtime.service")
const ReservationRequest = require("./reservation.request")
const {deleteFile} = require("../../config/helpers");
const generateQR = require("../../services/qr.service");
const mailSvc = require("../../services/mail.service")

class ReservationController{
    createReservation = async (req, res, next)=>{
        try{
            const showtime = await showtimeSvc.showtimeDetail({_id: req.body.showTimeId});
            const reservation = (new ReservationRequest(req)).transformCreateReservationRequest(showtime);
            const response = await reservationSvc.create(reservation);
            if(response){
                const QRcode = await generateQR(`${process.env.FRONTEND_URL}/checkin/${response._id}`);
                const mailmsg = `<div style="text-align: center;">
                <h1>Movie ticket</h1><hr/>
                <p>Customer Name: ${req.authUser.name}</p><hr/>
                <p>Seats: ${response.selectedSeats}</p><hr/>
                <p>QR:</p> ${QRcode}<hr/>
                <p>Showtime: ${showtime.startDate.toLocaleString()}`

                const mailack = await mailSvc.emailSend(req.authUser.email, "Your ticket", mailmsg);

                res.json({
                    result: response,
                    message: "Reservation Successful",
                    meta: null
                })
            }
            else{
                throw ({code: 400, message: "Error creating reservation..try again"})
            }
        }
        catch(except){
            next(except)
        }
    }

    readAll = async(req, res, next)=>{
        try{
            let filter = {};
            if(req.query['search']){
                filter = {
                    $or: [
                        {
                            title: new RegExp(req.query['search'], 'i')
                        },
                        {
                            director: new RegExp(req.query['search'], 'i')
                        },
                        {
                            genre: new RegExp(req.query['search'], 'i')
                        },
                        {
                            cast: new RegExp(req.query['search'], 'i')
                        },
                        {
                            description: new RegExp(req.query['search'], 'i')
                        },
                    ]
                    
                }
            }


            let page = req.query['page']??1;
            let limit = req.query['limit']??10;
            let skip = (page-1)*limit;

            let response = await reservationSvc.listAllReservation(filter, {skip, limit});
            res.json({
                result: response,
                message: "Reservations fetched successfully",
                meta: {
                    totalReservation : await reservationSvc.countReservation(),
                    currentPage: page,
                    limit: limit
                }
            })
        }
        catch(except){
            console.log("reservationCtrl.readAll: ", except);
            next(except);
        }
    }

    readOne = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let reservation = await reservationSvc.reservationDetail({_id: id});
            res.json({
                result: reservation,
                message: "Reservation detail fetched",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    update = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let reservation = await reservationSvc.reservationDetail({_id: id, createdBy: req.authUser._id});
            if(reservation){
                let data = (new ReservationRequest(req)).transformUpdateReservationRequest(reservation);
                let oldReservation = await reservationSvc.updateReservation(id, data);
                if(data.image)
                    deleteFile('./public/uploads/reservations/', oldReservation.image);

                res.json({
                    result: oldReservation,
                    message: "Reservation updated successfully",
                    meta: {
                        totalReservation : await reservationSvc.countReservation()
                    }
                })
            }
            else{
                next({code: 404, message: "Reservation not found"})
            }
        }
        catch(except){
            console.log("reservationCtrl.update: ", except);
            next(except);
        }
    }

    delete = async(req, res, next)=>{
        try{
            let id = req.params.id;
            await reservationSvc.reservationDetail({_id: id, createdBy: req.authUser._id});
            let deleteReservation = await reservationSvc.deleteReservation(id);
            if(deleteReservation.image)
                deleteFile('./public/uploads/reservations/', deleteReservation.image);
            res.json({
                result: deleteReservation,
                message: "Reservation deleted",
                meta: {
                    totalReservation : await reservationSvc.countReservation()
                }
            })
        }
        catch(except){
            console.log("reservationCtrl.delete: ", except);
            next(except);
        }
    }

    readHome = async(req, res, next)=>{
        try{
            let response = await reservationSvc.listAllReservation({status: "active"}, {skip: 0, limit: 10}, {_id: "desc"});
            res.json({
                result: response,
                message: "Reservation for home fetched successfully",
                meta: {
                    activeReservation : await reservationSvc.countReservation({status: "active"})
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    checkin = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const reservation = await reservationSvc.reservationDetail({_id: id});
            if(reservation.status === "booked"){
                const checkin  = await reservationSvc.updateReservation(id, {status: "checked"});
                res.json({
                    result: checkin,
                    message: "Ticket checked in",
                    meta: null
                })
            }
            else{
                next({error: 400, message: "Ticket already redeemed or invalid"});
            }
        }
        catch(except){
            next(except)
        }
    }

    onlinePayment = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const reservation = await reservationSvc.reservationDetail({_id: id});
            if(reservation){
                //TODO: API integration for online payment
                //dummy data for successful payment
                let payment = true;
                if(payment){
                    const pay  = await reservationSvc.updateReservation(id, {status: "booked"});
                    res.json({
                        result: pay,
                        message: "Ticket booked",
                        meta: null
                    })
                }
                else{
                    next({code: 400, message: "Payment failed!! Try Again"})
                }
            }
            else{
                next({error: 400, message: "Create Reservation First"});
            }
        }
        catch(except){
            next(except)
        }
    }

    offlinePayment = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const reservation = await reservationSvc.reservationDetail({_id: id});
            if(reservation){
                    const pay  = await reservationSvc.updateReservation(id, {status: "booked"});
                    res.json({
                        result: pay,
                        message: "Ticket booked",
                        meta: null
                    })
            }
            else{
                next({error: 400, message: "Create Reservation First"});
            }
        }
        catch(except){
            next(except)
        }
    }
}

const reservationCtrl = new ReservationController();
module.exports = reservationCtrl