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
}

const movieCtrl = new MovieController();

module.exports = movieCtrl