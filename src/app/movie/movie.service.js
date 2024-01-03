const MovieModel = require("./movie.model");

class MovieService{
    create = async (payload)=>{
        try{
            const movie = new MovieModel(payload);
            return await movie.save();
        }
        catch(except){
            throw except
        }
    }

    countMovie = async(filter = {})=>{
        try{
            let count = await MovieModel.countDocuments(filter);
            return count;
        }
        catch(except){
            throw except;
        }
    }

    listAllMovie = async(filter = {}, paging = {skip: 0, limit: 10}, sort = {_id: -1})=>{
        try{
            let response = await MovieModel.find(filter)
                .populate('createdBy', ['_id', 'name'])
                .sort(sort)
                .skip(paging.skip)
                .limit(paging.limit)
            return response;
        }
        catch(except){
            throw except;
        }
    }

    movieDetail = async(filter)=>{
        try{
            let response = await MovieModel.findOne(filter);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    updateMovie = async(id, data)=>{
        try{
            let response = await MovieModel.findByIdAndUpdate(id, data);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deleteMovie = async(id)=>{
        try{
            let response = await MovieModel.findByIdAndDelete(id);
            if(response){
                return response;
            }
            else{
                throw ({code: 404, message: "Movie already deleted or doesn't exist"});
            }
            return response;
        }
        catch(except){
            throw except;
        }
    }
}

const movieSvc = new MovieService();
module.exports = movieSvc