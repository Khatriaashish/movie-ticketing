class ReservationRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser;
    }

    transformCreateReservationRequest = (showtime)=>{
        const payload = {
            ...this.body,
        }
        payload.date = showtime.startDate;
        payload.ticketPrice = showtime.theatreId.ticketPrice;
        payload.total = showtime.theatreId.ticketPrice;
        payload.movieId = showtime.movieId;
        payload.theatreId = showtime.theatreId;
        payload.user = this.user._id;
        payload.selectedSeats = [];
        payload.selectedSeats = payload.selected.split(",");
        return payload;
    }

    transformUpdateReservationRequest = (showtime)=>{
        const payload = {
            ...this.body,
        }

        payload.date = showtime.startDate;
        payload.ticketPrice = showtime.theatreId.ticketPrice;
        payload.total = showtime.theatreId.ticketPrice;
        payload.movieId = showtime.movieId;
        payload.theatreId = showtime.theatreId;
        payload.user = this.user._id;
        payload.selectedSeats = [];
        payload.selectedSeats = payload.selected.split(",");
        return payload;
    }
}

module.exports = ReservationRequest