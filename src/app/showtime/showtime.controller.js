const showtimeSvc = require("./showtime.service");
const ShowtimeRequest = require("./showtime.request")
const {deleteFile} = require("../../config/helpers")

class ShowtimeController{
    createShowtime = async (req, res, next)=>{
        try{
            const showtime = (new ShowtimeRequest(req)).transformCreateShowtimeRequest();
            const response = await showtimeSvc.create(showtime);
            res.json({
                result: response,
                message: "Showtime Created Successfully",
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
                            showtime: new RegExp(req.query['search'], 'i')
                        },
                        {
                            startDate: new RegExp(req.query['search'], 'i')
                        },
                        {
                            endDate: new RegExp(req.query['search'], 'i')
                        },
                        {
                            movieId: new RegExp(req.query['search'], 'i')
                        },
                        {
                            theatreId: new RegExp(req.query['search'], 'i')
                        },
                    ]
                    
                }
            }


            let page = req.query['page']??1;
            let limit = req.query['limit']??10;
            let skip = (page-1)*limit;

            let response = await showtimeSvc.listAllShowtime(filter, {skip, limit});
            res.json({
                result: response,
                message: "Showtimes fetched successfully",
                meta: {
                    totalShowtime : await showtimeSvc.countShowtime(),
                    currentPage: page,
                    limit: limit
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    readOne = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let showtime = await showtimeSvc.showtimeDetail({_id: id});
            res.json({
                result: showtime,
                message: "Showtime detail fetched",
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
            let showtime = await showtimeSvc.showtimeDetail({_id: id, createdBy: req.authUser._id});
            if(showtime){
                let data = (new ShowtimeRequest(req)).transformUpdateShowtimeRequest(showtime);
                let oldShowtime = await showtimeSvc.updateShowtime(id, data);
                if(data.image)
                    deleteFile('./public/uploads/showtimes/', oldShowtime.image);

                res.json({
                    result: oldShowtime,
                    message: "Showtime updated successfully",
                    meta: {
                        totalShowtime : await showtimeSvc.countShowtime()
                    }
                })
            }
            else{
                next({code: 404, message: "Showtime not found"})
            }
        }
        catch(except){
            console.log("showtimeCtrl.update: ", except);
            next(except);
        }
    }

    delete = async(req, res, next)=>{
        try{
            let id = req.params.id;
            await showtimeSvc.showtimeDetail({_id: id, createdBy: req.authUser._id});
            let deleteShowtime = await showtimeSvc.deleteShowtime(id);
            if(deleteShowtime.image)
                deleteFile('./public/uploads/showtimes/', deleteShowtime.image);
            res.json({
                result: deleteShowtime,
                message: "Showtime deleted",
                meta: {
                    totalShowtime : await showtimeSvc.countShowtime()
                }
            })
        }
        catch(except){
            console.log("showtimeCtrl.delete: ", except);
            next(except);
        }
    }

    readHome = async(req, res, next)=>{
        try{
            let response = await showtimeSvc.listAllShowtime({status: "active"}, {skip: 0, limit: 10}, {_id: "desc"});
            res.json({
                result: response,
                message: "Showtime for home fetched successfully",
                meta: {
                    activeShowtime : await showtimeSvc.countShowtime({status: "active"})
                }
            })
        }
        catch(except){
            next(except);
        }
    }
}

const showtimeCtrl = new ShowtimeController();
module.exports = showtimeCtrl