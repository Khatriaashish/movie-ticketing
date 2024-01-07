const UserModel = require("./user.model");

class UserService{
    getFilter = async(filter, query)=>{
        try{
            if(query.search){
                filter = {
                    ...filter,
                    $or: [
                        {name: new RegExp(query.search, 'i')},
                        {email: new RegExp(query.search, 'i')},
                        {role: new RegExp(query.search, 'i')},
                    ]
                }
            }
            
            const page = +query.page || 1
            const limit = +query.limit || 10
            let pagination = {
                page: page,
                limit: limit,
                skip: (page - 1) * limit
            }

            let sort = {name: "asc", _id: "desc"}
            if(query.sort){
                const sortsplit = query.sort.split(',');
                sort = {[sortsplit[0]]: sortsplit[1]}
            }
            return {filter, pagination, sort}
        }
        catch(except){
            throw except
        }
    }

    getByFilter = async(filter = {}, pagination = {page: 1, skip: 0, limit: 10}, sort = {_id: "desc"})=>{
        try{
            const user = await UserModel.find(filter)
                .sort(sort)
                .skip(pagination.skip)
                .limit(pagination.limit)

            return user
        }
        catch(except){
            throw except
        }
    }

    updateById = async(id, updateData)=>{
        try{
            const updated = await UserModel.findByIdAndUpdate(id, updateData);
            return updated
        }
        catch(except){
            next(except);
        }
    }

    getById = async(id)=>{
        try{
            const user = await UserModel.findById(id);
            return user
        }
        catch(except){
            next(except);
        }
    }

    deleteById = async(id)=>{
        try{
            const deleted = await UserModel.findByIdAndDelete(id);
            return deleted
        }
        catch(except){
            next(except);
        }
    }
}

const userSvc = new UserService();

module.exports = userSvc;