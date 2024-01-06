const ShowtimeModel = require("./showtime.model");

class ShowtimeService{
    create = async (payload)=>{
        try{
            const showtime = new ShowtimeModel(payload);
            return await showtime.save();
        }
        catch(except){
            throw except
        }
    }

    countShowtime = async(filter = {})=>{
        try{
            let count = await ShowtimeModel.countDocuments(filter);
            return count;
        }
        catch(except){
            throw except;
        }
    }

    listAllShowtime = async(filter = {}, paging = {skip: 0, limit: 10}, sort = {_id: -1})=>{
        try{
            let response = await ShowtimeModel.find(filter)
                .populate('createdBy', ['_id', 'name'])
                .populate('theatreId', ['_id', 'title', 'ticketPrice'])
                .sort(sort)
                .skip(paging.skip)
                .limit(paging.limit)
            return response;
        }
        catch(except){
            throw except;
        }
    }

    showtimeDetail = async(filter)=>{
        try{
            let response = await ShowtimeModel.findOne(filter)
                .populate('createdBy', ['_id', 'name'])
                .populate('theatreId', ['_id', 'title', 'ticketPrice']);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    updateShowtime = async(id, data)=>{
        try{
            let response = await ShowtimeModel.findByIdAndUpdate(id, data);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deleteShowtime = async(id)=>{
        try{
            let response = await ShowtimeModel.findByIdAndDelete(id);
            if(response){
                return response;
            }
            else{
                throw ({code: 404, message: "Showtime already deleted or doesn't exist"});
            }
            return response;
        }
        catch(except){
            throw except;
        }
    }
}

const showtimeSvc = new ShowtimeService();
module.exports = showtimeSvc