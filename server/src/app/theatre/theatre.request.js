const { toLetters } = require("../../config/helpers");

class TheatreRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser._id;
    }

    transformCreateTheatreRequest = ()=>{
        const payload = {
            ...this.body,
        }

        if(!this.file)
            throw {code: 400, message: "Image required"};
        payload.image = this.file.filename 

        payload.seatsAvailable = payload.row*payload.column;

        payload.createdBy = this.user;

        return payload;
    }

    transformUpdateTheatreRequest = (old)=>{
        const payload = {
            ...this.body,
        }

        if(this.file)
            payload.image = this.file.filename
        else
            payload.image =  old.image;

        payload.seatsAvailable = payload.row*payload.column;

        return payload;
    }
}

module.exports = TheatreRequest