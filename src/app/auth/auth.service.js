const {generateRandomString} = require('../../config/helpers');
const UserModel = require('../user/user.model');
const PATModel = require('./personal-access-token.model');
class AuthService{
    transformRequestData = (req)=>{
        try{
            let payload = req.body;

            if(req.file){
                payload.image = req.file.filename;
            }
            else if(req.files){
                payload.image = req.files.map((item)=>item.filename)
            }

            payload.status = 'inactive';
            payload.token = generateRandomString();

            return payload;
        }
        catch(except){
            console.log("transformRequestData: ", except);
            throw except;
        }
    }

    storePayload = async(payload)=>{
        try{
            let user = new UserModel(payload);
            let response = user.save();
            return response;
        }
        catch(except){
            console.log("storePayload: ", except);
            throw except
        }
    }

    registerEmailMessage = (name, token)=>{
        return `<h1> Dear ${name},</h1> </br>
        <a href="${process.env.FRONTEND_URL}/verify-token/${token}">Click Here</a> to verify your email.`
    }

    getUserByFilter = async(filter)=>{
        try{
            let response = await UserModel.findOne(filter);
            console.log(response);
            return response;
        }
        catch(except){
            console.log("getUserByFilter: ", except);
            next(except);
        }
    }

    updateUser = async(filter, updateData)=>{
        try{
            let response = await UserModel.updateOne(filter, {$set: updateData});
            return response;
        }
        catch(except){
            console.log("updateUser: ", except);
            next(except);
        }
    }

    patStore = async(data)=>{
        try{
            let pat = new PATModel(data);
            let response = await pat.save();
            return response;
        }
        catch(except){
            console.log("patStore: ", except);
            next(except);
        }
    }

    getPatDataByFilter = async(filter)=>{
        try{
            let response = await PATModel.findOne(filter);
            return response;
        }
        catch(except){
            console.log("getPatDataByFilter: ", except);
            next(except);
        }
    }

    deletePatData = async(filter)=>{
        try{
            let response = await PATModel.deleteOne(filter);
            return response;
        }
        catch(except){
            console.log("deletePatData: ", response);
            next(except);
        }
    }
}

const authSvc = new AuthService();

module.exports = authSvc;