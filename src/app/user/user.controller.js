const { deleteFile } = require("../../config/helpers");
const authSvc = require("../auth/auth.service");
const UserModel = require("./user.model");
const UserRequest = require("./user.request");
const userSvc = require("./user.service");
const bcrypt = require('bcryptjs')
class UserController{
    listAllUsers = async(req, res, next)=>{
        try{
            let {filter, pagination, sort} = await userSvc.getFilter({}, req.query);

            let users = await userSvc.getByFilter(filter, pagination, sort);
            res.json({
                result: users,
                message: "All the users are listed",
                meta: {

                }
            })
        }
        catch(except){
            next(except);
        }
    }

    getByRole = async(req, res, next)=>{
        try{
            let {filter, pagination, sort} = await userSvc.getFilter({role: req.params.role}, req.query);

            let users = await userSvc.getByFilter(filter, pagination, sort);
            res.json({
                result: users,
                message: "Specified role users are listed",
                meta: {

                }
            })
        }
        catch(except){
            next(except);
        }
    }

    getByStatus = async(req, res, next)=>{
        try{
            let {filter, pagination, sort} = await userSvc.getFilter({status: req.params.status}, req.query);
            console.log(filter)
            let users = await userSvc.getByFilter(filter, pagination, sort);
            res.json({
                result: users,
                message: "Specified status users are listed",
                meta: {

                }
            })
        }
        catch(except){
            next(except);
        }
    }

    createStaff = async(req, res, next)=>{
        try{
            let payload = (new UserRequest(req)).createStaffTransform();
            let response = await authSvc.storePayload(payload);
            res.json({
                result: response,
                message: "Staff Created",
                meta: {
                    totalStaff: await UserModel.countDocuments({role: RegExp(/admin|kitchen|waiter/)})
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    changePassword = async(req, res, next)=>{
        try{
            let data = req.body;
            if(bcrypt.compareSync(data.oldPassword, req.authUser.password)){
                let encNew = bcrypt.hashSync(data.newPassword);
                let id = req.authUser._id;
                let response = await userSvc.updateById(id, {password: encNew});
                res.json({
                    result: response,
                    message: "Password changed Successfully",
                    meta: null
                })
            }
            else{
                next({code: 401, message: "Old Password doesn't match"})
            }
        }
        catch(except){
            next(except);
        }
    }

    changePicture = async(req, res, next)=>{
        try{
            
            let image = req.file.filename;
            let id = req.authUser._id;
            let response = await userSvc.updateById(id, {image: image});
            if(response)
                deleteFile('./public/uploads/users/', response.image)
            res.json({
                result: response,
                message: "Profile Picture changed Successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }
    
    deleteUser = async(req, res, next)=>{
        try{
            let id = req.params.id
            let user = await userSvc.getById(id);
            if(!user){
                next({code: 404, message: "User doesn't exist"});
            }
            else{
                let deleted = await userSvc.deleteById(id);
                if(deleted)
                    deleteFile('./public/uploads/users/', deleted.image)
                res.json({
                    result: deleted,
                    message: "User deleted successfully",
                    meta: null
                })
            }
        }
        catch(except){
            next(except);
        }
    }
}

const userCtrl = new UserController();

module.exports = userCtrl