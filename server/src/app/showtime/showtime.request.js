class ShowtimeRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser._id;
    }

    transformCreateShowtimeRequest = (movie)=>{
        const payload = {
            ...this.body,
        }

        const startDate = payload.startDate + 'T' + payload.startTime;
        payload.startDate = new Date(startDate);
        const endDate = new Date(payload.startDate);
        endDate.setHours(endDate.getHours()+movie.duration.hours);
        endDate.setMinutes(endDate.getMinutes()+movie.duration.minutes);
        endDate.setSeconds(endDate.getSeconds()+movie.duration.seconds);
        payload.endDate = endDate;

        payload.createdBy = this.user;

        return payload;
    }

    transformUpdateShowtimeRequest = (movie)=>{
        const payload = {
            ...this.body,
        }

        const startDate = payload.startDate + 'T' + payload.startTime;
        payload.startDate = new Date(startDate);
        const endDate = new Date(payload.startDate);
        endDate.setHours(endDate.getHours()+movie.duration.hours);
        endDate.setMinutes(endDate.getMinutes()+movie.duration.minutes);
        endDate.setSeconds(endDate.getSeconds()+movie.duration.seconds);
        payload.endDate = endDate;

        return payload;

    }
}

module.exports = ShowtimeRequest