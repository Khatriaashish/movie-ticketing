const generateRandomString = (len = 100)=>{
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = "";
    for(let i = 1; i<=len; i++){
        let pos = Math.floor(Math.random()*(chars.length-1));
        random += chars[pos];
    }
    return random
}

const getTokenFromHeaders = (req)=>{
    let token = null;

    if(req.headers['x-xsrf-token']){
        token = req.headers['x-xsrf-token'];
    }

    if(req.params['token']){
        token = req.params['token'];
    }

    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }

    return token;
}

module.exports = {generateRandomString, getTokenFromHeaders}