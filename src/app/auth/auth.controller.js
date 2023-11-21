const authSvc = require("./auth.service");
const mailSvc = require('../../services/mail.service')

class AuthController{
    register = async (req, res, next)=>{
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
}

const authCtrl = new AuthController();
module.exports = authCtrl