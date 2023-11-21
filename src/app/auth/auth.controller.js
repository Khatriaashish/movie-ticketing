const authSvc = require("./auth.service");
const mailSvc = require('../../services/mail.service')
const bcrypt = require('bcryptjs')

class AuthController{
    register = async (req, res, next)=>{
        try{
            //receive data from user
            let payload = authSvc.transformRequestData(req);

            //store data in db
            let response = await authSvc.storePayload(payload);

            //mail
            const msg = authSvc.registerEmailMessage(payload.name, payload.token);
            await mailSvc.emailSend(payload.email, "Verify your email", msg);

            //FE response
            res.json({
                result: response,
                message: "Data stored in database",
                meta: null
            })
        }
        catch(except){
            console.log("register: ", except);
            next(except);
        }
    }

    verifyToken = async(req, res, next)=>{
        try{
            let token = req.params.token;
            let userDetail = await authSvc.getUserByFilter({token: token});
            if(userDetail){
                res.json({
                    result: userDetail,
                    message: "Token Verified",
                    meta: null
                })
            }
            else{
                next({code: 404, message: "Invalid or expired token"})
            }
        }
        catch(except){
            console.log("verifyToken: ", except);
            next(except);
        }
    }

    setPassword = async(req, res, next)=>{
        try{
            let data = req.body;
            let token = req.params.token;
            let userDetail = await authSvc.getUserByFilter({token: token});
            if(userDetail){
                let updateData = {
                    password: bcrypt.hashSync(data.password, 10),
                    token: null,
                    status: 'active'
                }
                let response = await authSvc.updateUser({token: token}, updateData);
    
                res.json({
                    result: response,
                    message: "Password Set successfully",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "Token Expired on Invalid token"})
            }
        }
        catch(except){
            console.log("setPassword: ", except);
            next(except);
        }
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl