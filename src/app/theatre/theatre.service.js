const TheatreModel = require("./theatre.model");

class TheatreService{
    create = async (payload)=>{
        try{
            const theatre = new TheatreModel(payload);
            return await theatre.save();
        }
        catch(except){
            throw except
        }
    }

    countTheatre = async(filter = {})=>{
        try{
            let count = await TheatreModel.countDocuments(filter);
            return count;
        }
        catch(except){
            throw except;
        }
    }

    listAllTheatre = async(filter = {}, paging = {skip: 0, limit: 10}, sort = {_id: -1})=>{
        try{
            let response = await TheatreModel.find(filter)
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

    theatreDetail = async(filter)=>{
        try{
            let response = await TheatreModel.findOne(filter);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    updateTheatre = async(id, data)=>{
        try{
            let response = await TheatreModel.findByIdAndUpdate(id, data);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deleteTheatre = async(id)=>{
        try{
            let response = await TheatreModel.findByIdAndDelete(id);
            if(response){
                return response;
            }
            else{
                throw ({code: 404, message: "Theatre already deleted or doesn't exist"});
            }
            return response;
        }
        catch(except){
            throw except;
        }
    }
}

const theatreSvc = new TheatreService();
module.exports = theatreSvc