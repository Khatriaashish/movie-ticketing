const BannerModel = require("./banner.model");

class BannerService{
    transformCreateData = (req)=>{
        try{
            let data = {
                ...req.body
            }

            if(req.file){
                throw {code: 400, message: "Image is required"};
            }
            else{
                data.image = req.file.filename;
            }

            data.createdBy =  req.authUser._id;

            return data;
        }   
        catch(except){
            console.log("bannerSvc.transformCreateData: ", except);
            throw except;
        }
    }

    transformUpdateData = (req)=>{
        try{
            let data = {
                ...req.body
            }
            
            if(req.file)
                data.image = req.file.filename;

            return data;
        }   
        catch(except){
            console.log("bannerSvc.transformUpdateData: ", except);
            throw except;
        }
    }

    bannerStore = async (data)=>{
        try{
            let banner = new BannerModel(data);
            let response = await banner.save();
            return response;
        }
        catch(except){
            console.log("bannerSvc.bannerStore: ", except);
            throw except;
        }
    }

    countBanner = async(filter = {})=>{
        try{
            let count = await BannerModel.countDocuments(filter);
            return count;
        }
        catch(except){
            console.log("bannerSvc.countBanner: ", except);
            throw except;
        }
    }

    listAllBanner = async(filter = {}, paging = {skip: 0, limit: 10}, sort = {_id: -1})=>{
        try{
            let response = await BannerModel.find(filter)
                .populate('createdBy', ['_id', 'name'])
                .sort(sort)
                .skip(paging.skip)
                .limit(paging.limit)
            return response;
        }
        catch(except){
            console.log("bannerSvc.listAllBanner: ", except);
            throw except;
        }
    }

    bannerDetail = async(filter)=>{
        try{
            let response = await BannerModel.findOne(filter);
            return response;
        }
        catch(except){
            console.log("bannerSvc.bannerDetail: ", except);
            throw except;
        }
    }

    updateBanner = async(id, data)=>{
        try{
            let response = await BannerModel.findByIdAndUpdate(id, data);
            return response;
        }
        catch(except){
            console.log("bannerSvc.bannerDetail: ", except);
            throw except;
        }
    }

    deleteBanner = async(id)=>{
        try{
            let response = await BannerModel.findByIdAndDelete(id);
            if(response){
                return response;
            }
            else{
                throw ({code: 404, message: "Banner already deleted or doesn't exist"});
            }
            return response;
        }
        catch(except){
            console.log("bannerSvc.bannerDetail: ", except);
            throw except;
        }
    }

    
}

const bannerSvc = new BannerService();
module.exports = bannerSvc;