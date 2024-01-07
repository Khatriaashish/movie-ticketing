const authSvc = require("../app/auth/auth.service");
const { getTokenFromHeaders } = require("../config/helpers");
const jwt = require('jsonwebtoken');

const checkLogin = async (req, res, next)=>{
    try{
        let token = getTokenFromHeaders(req);


        if(token===null){
            next({code: 400, message: "Please login First"});
        }
        else{
            token = token.split(" ").pop();
            if(!token){
                next({code: 400, message: "Token Required"})
            }
            else{
                let PATdata = await authSvc.getPatDataByFilter({token: token});
                if(PATdata){
                    let data = jwt.verify(token, process.env.JWT_SECRET);
                    let userDetail = await authSvc.getUserByFilter({_id: PATdata.userId});
                    if(userDetail){
                        req.authUser = userDetail;
                        next();
                    }
                    else{
                        next({code: 400, message: "User doesn't exist anymore"})
                    }
                }
                else{
                    next({code: 400, message: "Token expired"});
                }
            }
        }
    }
    catch(except){
        console.log("CheckLogin: ", except);
        next(except);
    }
}

module.exports = checkLogin