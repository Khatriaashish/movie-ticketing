class MovieRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser._id;
    }

    transformCreateMovieRequest = ()=>{
        const payload = {
            ...this.body,
        }

        if(!this.file)
            throw {code: 400, message: "Image required"};
        
        payload.image = this.file.filename 

        const duration = payload.duration.split(":");
        payload.duration = {}
        payload.duration.hours = duration[0];
        payload.duration.minutes = duration[1];
        payload.duration.seconds = duration[2];

        payload.releaseDate = new Date(payload.releaseDate);
        payload.createdBy = this.user;

        return payload;
    }

    transformUpdateMovieRequest = (old)=>{
        const payload = {
            ...this.body,
        }

        if(this.file)
            payload.image = this.file.filename
        else
            payload.image =  old.image;

        payload.releaseDate = new Date(payload.releaseDate);

            return payload;
    }
}

module.exports = MovieRequest