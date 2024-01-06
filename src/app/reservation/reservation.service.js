const ReservationModel = require("./reservation.model");

class ReservationService{
    create = async (payload)=>{
        try{
            const reservation = new ReservationModel(payload);
            return await reservation.save();
        }
        catch(except){
            throw except
        }
    }

    countReservation = async(filter = {})=>{
        try{
            let count = await ReservationModel.countDocuments(filter);
            return count;
        }
        catch(except){
            throw except;
        }
    }

    listAllReservation = async(filter = {}, paging = {skip: 0, limit: 10}, sort = {_id: -1})=>{
        try{
            let response = await ReservationModel.find(filter)
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

    reservationDetail = async(filter)=>{
        try{
            let response = await ReservationModel.findOne(filter);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    updateReservation = async(id, data)=>{
        try{
            let response = await ReservationModel.findByIdAndUpdate(id, data);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deleteReservation = async(id)=>{
        try{
            let response = await ReservationModel.findByIdAndDelete(id);
            if(response){
                return response;
            }
            else{
                throw ({code: 404, message: "Reservation already deleted or doesn't exist"});
            }
            return response;
        }
        catch(except){
            throw except;
        }
    }
}

const reservationSvc = new ReservationService();
module.exports = reservationSvc