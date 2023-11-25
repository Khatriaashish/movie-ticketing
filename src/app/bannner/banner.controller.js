const { deleteFile } = require("../../config/helpers");
const bannerSvc = require("./banner.service");

class BannerController{
    create = async(req, res, next)=>{
        try{
            let bannerData = bannerSvc.transformCreateData(req);

            let response = await bannerSvc.bannerStore(bannerData);

            res.json({
                result: response,
                message: "Banner created successfully",
                meta: {
                    totalBanner : await bannerSvc.countBanner()
                }
            })
        }
        catch(except){
            console.log("bannerCtrl.createBanner: ", except);
            next(except);
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
                            url: new RegExp(req.query['search'], 'i')
                        },
                        {
                            status: new RegExp(req.query['search'], 'i')
                        }
                    ]
                    
                }
            }

            filter = {
                $and: [
                    {...filter},
                    {
                        createdBy: req.authUser._id
                    }
                ]
            }

            let page = req.query['page']??1;
            let limit = req.query['limit']??10;
            let skip = (page-1)*limit;

            let response = await bannerSvc.listAllBanner(filter, {skip, limit});
            res.json({
                result: response,
                message: "Banners fetched successfully",
                meta: {
                    totalBanner : await bannerSvc.countBanner(),
                    currentPage: page,
                    limit: limit
                }
            })
        }
        catch(except){
            console.log("bannerCtrl.readAll: ", except);
            next(except);
        }
    }

    readOne = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let banner = await bannerSvc.bannerDetail({_id: id, createdBy: req.authUser._id});
            res.json({
                result: banner,
                message: "Banner detail fetched",
                meta: null
            })
        }
        catch(except){
            console.log("bannerCtrl.readOne: ", except);
            next(except);
        }
    }

    update = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let banner = await bannerSvc.bannerDetail({_id: id, createdBy: req.authUser._id});
            if(banner){
                let data = bannerSvc.transformUpdateData(req);
                let oldBanner = await bannerSvc.updateBanner(id, data);
                if(data.image)
                    deleteFile('./public/uploads/banners/', oldBanner.image);

                res.json({
                    result: oldBanner,
                    message: "Banner updated successfully",
                    meta: {
                        totalBanner : await bannerSvc.countBanner()
                    }
                })
            }
            else{
                next({code: 404, message: "Banner not found"})
            }
        }
        catch(except){
            console.log("bannerCtrl.update: ", except);
            next(except);
        }
    }

    delete = async(req, res, next)=>{
        try{
            let id = req.params.id;
            await bannerSvc.bannerDetail({_id: id, createdBy: req.authUser._id});
            let deleteBanner = await bannerSvc.deleteBanner(id);
            if(deleteBanner.image)
                deleteFile('./public/uploads/banners/', deleteBanner.image);
            res.json({
                result: deleteBanner,
                message: "Banner deleted",
                meta: {
                    totalBanner : await bannerSvc.countBanner()
                }
            })
        }
        catch(except){
            console.log("bannerCtrl.delete: ", except);
            next(except);
        }
    }

    readHome = async(req, res, next)=>{
        try{
            let response = await bannerSvc.listAllBanner({status: "active"}, {skip: 0, limit: 10}, {_id: "desc"});
            res.json({
                result: response,
                message: "Banner for home fetched successfully",
                meta: {
                    activeBanner : await bannerSvc.countBanner({status: "active"})
                }
            })
        }
        catch(except){
            console.log("bannerCtrl.readHome: ", except);
            next(except);
        }
    }
}

const bannerCtrl = new BannerController();

module.exports = bannerCtrl;