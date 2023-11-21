const {generateRandomString} = require('../../config/helpers');
const UserModel = require('../user/user.model');
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
            next(except);
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
            next(except)
        }
    }

    registerEmailMessage = (name, token)=>{
        return `<h1> Dear ${name},</h1> </br>
        <a href="${process.env.FRONTEND_URL}/verify-token/${token}">Click Here</a> to verify your email.`
    }
}

const authSvc = new AuthService();

module.exports = authSvc;