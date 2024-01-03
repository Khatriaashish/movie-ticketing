const movieSvc = require("./movie.service");
const MovieRequest = require("./movie.request")
const {deleteFile} = require("../../config/helpers")

class MovieController{
    createMovie = async (req, res, next)=>{
        try{
            const movie = (new MovieRequest(req)).transformCreateMovieRequest();
            const response = await movieSvc.create(movie);
            res.json({
                result: response,
                message: "Movie Created Successfully",
                meta: null
            })  
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

            let response = await movieSvc.listAllMovie(filter, {skip, limit});
            res.json({
                result: response,
                message: "Movies fetched successfully",
                meta: {
                    totalMovie : await movieSvc.countMovie(),
                    currentPage: page,
                    limit: limit
                }
            })
        }
        catch(except){
            console.log("movieCtrl.readAll: ", except);
            next(except);
        }
    }

    readOne = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let movie = await movieSvc.movieDetail({_id: id});
            res.json({
                result: movie,
                message: "Movie detail fetched",
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
            let movie = await movieSvc.movieDetail({_id: id, createdBy: req.authUser._id});
            if(movie){
                let data = (new MovieRequest(req)).transformUpdateMovieRequest(movie);
                let oldMovie = await movieSvc.updateMovie(id, data);
                if(data.image)
                    deleteFile('./public/uploads/movies/', oldMovie.image);

                res.json({
                    result: oldMovie,
                    message: "Movie updated successfully",
                    meta: {
                        totalMovie : await movieSvc.countMovie()
                    }
                })
            }
            else{
                next({code: 404, message: "Movie not found"})
            }
        }
        catch(except){
            console.log("movieCtrl.update: ", except);
            next(except);
        }
    }

    delete = async(req, res, next)=>{
        try{
            let id = req.params.id;
            await movieSvc.movieDetail({_id: id, createdBy: req.authUser._id});
            let deleteMovie = await movieSvc.deleteMovie(id);
            if(deleteMovie.image)
                deleteFile('./public/uploads/movies/', deleteMovie.image);
            res.json({
                result: deleteMovie,
                message: "Movie deleted",
                meta: {
                    totalMovie : await movieSvc.countMovie()
                }
            })
        }
        catch(except){
            console.log("movieCtrl.delete: ", except);
            next(except);
        }
    }

    readHome = async(req, res, next)=>{
        try{
            let response = await movieSvc.listAllMovie({status: "active"}, {skip: 0, limit: 10}, {_id: "desc"});
            res.json({
                result: response,
                message: "Movie for home fetched successfully",
                meta: {
                    activeMovie : await movieSvc.countMovie({status: "active"})
                }
            })
        }
        catch(except){
            next(except);
        }
    }
}

const movieCtrl = new MovieController();
module.exports = movieCtrl