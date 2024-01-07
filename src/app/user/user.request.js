const bcrypt = require('bcryptjs');
class UserRequest{
    body;
    file;
    constructor(req){
        this.body = req.body;
        this.file=req.file;
    }

    createStaffTransform = ()=>{
        let payload = {
            ...this.body
        }
        if(this.file)
            payload.image = this.file.filename;
        else    
            throw {next: 400, message: "Image Required"}

        payload.password = bcrypt.hashSync(payload.password, 10);
        payload.token = null

        return payload;
    }
}

module.exports = UserRequest