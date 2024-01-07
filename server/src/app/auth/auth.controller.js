const authSvc = require("./auth.service");
const mailSvc = require('../../services/mail.service')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateRandomString } = require("../../config/helpers");
const { response } = require("express");
require('dotenv').config()

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

    login = async(req, res, next)=>{
        try{
            let credentials = req.body;
            let userDetail = await authSvc.getUserByFilter({email: credentials.email});
            if(userDetail){
                if(userDetail.token === null && userDetail.status === 'active'){
                    if(bcrypt.compareSync(credentials.password, userDetail.password)){
                        const token = jwt.sign({
                            userId: userDetail._id,
                        }, process.env.JWT_SECRET, {
                            expiresIn: '1h'
                        });
        
                        const refreshToken = jwt.sign({
                            userId: userDetail._id,
                        }, process.env.JWT_SECRET, {
                            expiresIn: '1d'
                        });
        
                        const patData = {
                            userId: userDetail._id,
                            token: token,
                            refreshToken: refreshToken
                        }
        
                        let response = await authSvc.patStore(patData);
        
                        res.json({
                            result: response,
                            message: "User logged In successfully"
                        })
                    }
                    else{
                        next({code: 401, message: "Credentials doesn't match"});
                    }
                }
                else{
                    next({code: 400, message: "User not activated"})
                }
            }
            else{
                next({code: 404, message: "User doesn't exist"});
            }
        }
        catch(except){
            console.log("login: ", except);
            next(except);
        }
    }

    getLoggedInUser = async(req, res, next)=>{
        let userDetail = req.authUser;
        res.json({
            result: userDetail,
            message: "Data of logged in User fetched successfully",
            meta: null
        })
    }

    logout = async(req, res, next)=>{
        try{
            let userDetail = await authSvc.getUserByFilter({_id: req.authUser._id});
            if(userDetail){
                let patData = await authSvc.getPatDataByFilter({userId: req.authUser._id});
                if(patData){
                    let logout = await authSvc.deletePatData({userId: req.authUser._id});
                    res.json({
                        result: logout,
                        message: "Logged Out Successfully",
                        meta: null
                    })
                }
            }
            else{
                next({code: 401, message: "User doesn't exist anymore"});
            }
        }
        catch(except){
            console.log("logout: ", except);
            next(except);
        }
    }

    forgetPassword = async(req, res, next)=>{
        try{
            let email = req.body.email;
            let userDetail = await authSvc.getUserByFilter({email: email});
            if(userDetail){
                let token = generateRandomString();
                let response = await authSvc.updateUser({email: email}, {resetToken: token, resetExpiry : Date.now() + 86400000});
                let msg = authSvc.resetPasswordEmailMessage(userDetail.name, token);
                let mailresponse = mailSvc.emailSend(email, "Reset your password", msg);

                res.json({
                    result: response,
                    message: "Check email for futher processing",
                    meta: null
                })
            }
            else{
                next({code: 404, message: "User not found"});
            }
            
        }
        catch(except){
            console.log("forgetPassword: ", except);
            next(except);
        }
    }

    resetPassword = async (req, res, next)=>{
        try{
            let resetToken = req.params.resetToken;
            let userDetail = await authSvc.getUserByFilter({resetToken: resetToken});
            if(userDetail){
                let today = new Date();
                if(userDetail.resetExpiry < today){
                    next({code: 401, message: "Token already expired"});
                }
                else{
                    let newPass = req.body.password;
                    let encPass = bcrypt.hashSync(newPass, 10);
                    let updateData = {
                        password: encPass,
                        resetToken: null,
                        resetExpiry: null
                    }
                    let response = await authSvc.updateUser({_id: userDetail._id}, updateData);

                    res.json({
                        result: response,
                        message: "Password reset successfully",
                        meta: null
                    })
                }
            }
            else{
                next({code: 400, message: "Invalid resetToken"})
            }
            
        }
        catch(except){
            console.log("resetPassword: ", except);
            next(except);
        }
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl