const theatreSvc = require("./theatre.service");
const TheatreRequest = require("./theatre.request")
const {deleteFile} = require("../../config/helpers")

class TheatreController{
    createTheatre = async (req, res, next)=>{
        try{
            const theatre = (new TheatreRequest(req)).transformCreateTheatreRequest();
            const response = await theatreSvc.create(theatre);
            res.json({
                result: response,
                message: "Theatre Created Successfully",
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

            let response = await theatreSvc.listAllTheatre(filter, {skip, limit});
            res.json({
                result: response,
                message: "Theatres fetched successfully",
                meta: {
                    totalTheatre : await theatreSvc.countTheatre(),
                    currentPage: page,
                    limit: limit
                }
            })
        }
        catch(except){
            console.log("theatreCtrl.readAll: ", except);
            next(except);
        }
    }

    readOne = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let theatre = await theatreSvc.theatreDetail({_id: id});
            res.json({
                result: theatre,
                message: "Theatre detail fetched",
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
            let theatre = await theatreSvc.theatreDetail({_id: id, createdBy: req.authUser._id});
            if(theatre){
                let data = (new TheatreRequest(req)).transformUpdateTheatreRequest(theatre);
                let oldTheatre = await theatreSvc.updateTheatre(id, data);
                if(data.image)
                    deleteFile('./public/uploads/theatres/', oldTheatre.image);

                res.json({
                    result: oldTheatre,
                    message: "Theatre updated successfully",
                    meta: {
                        totalTheatre : await theatreSvc.countTheatre()
                    }
                })
            }
            else{
                next({code: 404, message: "Theatre not found"})
            }
        }
        catch(except){
            console.log("theatreCtrl.update: ", except);
            next(except);
        }
    }

    delete = async(req, res, next)=>{
        try{
            let id = req.params.id;
            await theatreSvc.theatreDetail({_id: id, createdBy: req.authUser._id});
            let deleteTheatre = await theatreSvc.deleteTheatre(id);
            if(deleteTheatre.image)
                deleteFile('./public/uploads/theatres/', deleteTheatre.image);
            res.json({
                result: deleteTheatre,
                message: "Theatre deleted",
                meta: {
                    totalTheatre : await theatreSvc.countTheatre()
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    readHome = async(req, res, next)=>{
        try{
            let response = await theatreSvc.listAllTheatre({status: "active"}, {skip: 0, limit: 10}, {_id: "desc"});
            res.json({
                result: response,
                message: "Theatre for home fetched successfully",
                meta: {
                    activeTheatre : await theatreSvc.countTheatre({status: "active"})
                }
            })
        }
        catch(except){
            next(except);
        }
    }
}

const theatreCtrl = new TheatreController();
module.exports = theatreCtrl