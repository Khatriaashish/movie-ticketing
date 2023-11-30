const MovieModel = require("./movie.model");

class MovieService{
    transformCreateRequest = (req)=>{
        try{
            let payload = req.body;

            if(!req.file){
                throw {code: 400, message: "File required"};
            }
            else{
                payload.image = req.file.filename;
            }

            payload.createdBy = req.authUser._id;

            return payload;
        }
        catch(except){
            console.log('Svc:transformCreateRequest - ', except);
            throw except;
        }
    } 

    createMovie = async (data) => {
        try{
            let movie = new MovieModel(data);
            let response = await movie.save();
            return response;
        }
        catch(except){
            console.log('Svc:createMovie - ', except);
            throw except;
        }
    }

    getMovieByFilter = async (filter = {}, pagination = {skip: 0, limit: 10}, sort = {_id: 'desc'}) => {
        try{
            let response = await MovieModel.find(filter)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .populate('createdBy', ['_id', 'name', 'role'])
            .sort(sort);
                return response;
        }
        catch(except){
            console.log('Svc:getMovieByFilter - ', except);
            throw except;
        }
    }

    getMovieDetail = async(filter)=>{
        try{
            let response = await MovieModel.findOne(filter)
            .populate('createdBy', ['_id', 'name', 'role']);
            if(response === null){
                throw {code: 404, message: "Movie doesn't exist"}
            }
            return response;
        }
        catch(except){
            throw except;
        }
    }
}



const movieSvc = new MovieService();

module.exports = movieSvc;