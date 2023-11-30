const { deleteFile } = require("../../config/helpers");
const movieSvc = require("./movie.service");

class MovieController{
    create = async(req, res, next)=>{
        try{
            const payload = movieSvc.transformCreateRequest(req);
            const movie  = await movieSvc.createMovie(payload);
            res.json({
                result: movie,
                message: "Movie created Successfully",
                meta: null
            })
        }
        catch(except){
            console.log("Ctrl:Create - ", except)
            next(except)
        }
    }

    listAll = async(req, res, next)=>{
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
                            language: new RegExp(req.query['search'], 'i')
                        },
                        {
                            cast: new RegExp(req.query['search'], 'i')
                        },
                        {
                            genre: new RegExp(req.query['search'], 'i')
                        }
                    ]
                }
            }

            filter = {
                $and: [
                    {createdBy: req.authUser._id},
                    {...filter}
                ]
            }

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 10;

            let skip = (page-1)*limit;

            let response = await movieSvc.getMovieByFilter(filter, {skip: skip, limit: limit});

            res.json({
                result: response,
                message: "All movies fetched successfully",
                meta: null
            })

            
        }
        catch(except){
            // console.log("Ctrl:listAll - ", except)
            next(except);
        }
    }

    getDetail = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let movie = await movieSvc.getMovieDetail({_id: id, createdBy: req.authUser._id});
            res.json({
                result: movie,
                message: "Movie fetched Successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    update = async(req, res, next)=>{
        try{
            let movie = await movieSvc.getMovieDetail({_id: req.params.id, createdBy: req.authUser._id});
            const updateData = movieSvc.transformUpdateRequest(req);
            const oldData = await movieSvc.updateMovie(req.params.id, updateData);
            if(updateData.image){
                deleteFile('./public/uploads/movies/', oldData.image);
            }
            res.json({
                result: oldData,
                message: "Movie updated Successfully",
                meta: null
            })
        }
        catch(except){
            console.log("Ctrl:Create - ", except)
            next(except)
        }
    }

    delete = async(req, res, next)=>{
        try{
            let movie = await movieSvc.getMovieDetail({_id: req.params.id, createdBy: req.authUser._id});
            const oldData = await movieSvc.deleteMovie(req.params.id);
            if(oldData){
                deleteFile('./public/uploads/movies/', oldData.image);
            }
            res.json({
                result: oldData,
                message: "Movie Deleted Successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    getMovieForHome = async(req, res, next)=>{
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
                            language: new RegExp(req.query['search'], 'i')
                        },
                        {
                            cast: new RegExp(req.query['search'], 'i')
                        },
                        {
                            genre: new RegExp(req.query['search'], 'i')
                        }
                    ]
                }
            }

            filter = {
                $and: [
                    {status: 'active'},
                    {...filter}
                ]
            }

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 10;

            let skip = (page-1)*limit;

            let sort = {
                _id: "desc"
            }
            if(req.query.sort){
                let split = req.query.sort.split('=');
                sort = {[split[0]]: split[1]};
            }
            let response = await movieSvc.getMovieByFilter(filter, {skip: skip, limit: limit}, sort);
            res.json({
                result: response,
                message: "Movies for FE fetched successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }
}

const movieCtrl = new MovieController();

module.exports = movieCtrl