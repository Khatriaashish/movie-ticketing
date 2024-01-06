class ReservationRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser._id;
    }

    transformCreateReservationRequest = (showtime)=>{
        const payload = {
            ...this.body,
        }

        payload.ticketPrice = showtime.theatreId.ticketPrice;
        payload.total = showtime.theatreId.ticketPrice;
        payload.movieId = showtime.movieId;
        payload.theatreId = showtime.theatreId;
        payload.username = this.user.email;
        payload.selectedSeats = [];
        payload.selectedSeats = payload.selected.split(",");
        return payload;
    }

    transformUpdateReservationRequest = (old)=>{
        const payload = {
            ...this.body,
        }

        payload.ticketPrice = movie.ticketprice;
        payload.total = movie.ticketprice;
        payload.movieId = showtime.movieId;
        payload.theatreId = showtime.theatreId;
        payload.username = this.user.email;

            return payload;
    }
}

module.exports = ReservationRequest