const checkPermission = (role)=>{
    return (req, res, next) => {
        let loggedInUser = req.authUser;
        if((typeof role === 'string' && role === loggedInUser.role) || (typeof role !== 'string' && role.include(loggedInUser.role))){
            next();
        }
        else{
            next({code: 400, message: "You do not have permission"});
        }
    }
}

module.exports = checkPermission