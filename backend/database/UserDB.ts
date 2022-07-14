import { Document, Schema, PaginateModel, model} from 'mongoose'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { UserDBErrors } from './errors/UserDBError'

export interface DBUser extends Document {
    name: string
    password: string
    token: string
}

export const DBUserSchema = new Schema( {
    name: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: true}
}).plugin(mongoosePaginate)

export class UserDB {
    async connectToDatabase(uri: string, dbname: string):Promise<void>{
        const proxyUri = uri+dbname
        const opts: mongoose.ConnectOptions = {}
        
        await mongoose
            .connect(uri, opts)
            .then((c) => {
                console.log(`start > connected to ${c.connection.host}:${c.connection.port}/${c.connection.db.databaseName}`)
            })
            .catch((e) => {
              throw e
        })
        mongoose.plugin(mongoosePaginate)
    }

    async createUser(userName: string, pwd: string, tok: string):Promise<void>{
        const user = await DBUserModel.findOne({ name: userName }).exec()
        if (user){
            throw UserDBErrors.UserAlreadyExisting()
        }
        await DBUserModel.create({name: userName, password: pwd, token:tok})

    }

    async updateUserToken(userName: string, tok: string):Promise<void>{
        const user = await DBUserModel.findOne({ name: userName }).exec()
        if (!user){
            throw UserDBErrors.UserNotExisting()
        }
        const newUser = await DBUserModel.findOneAndUpdate(
            { name: userName },
            {name: userName, password: user.password, token:tok},
            {
              new: true
            }
          ).exec()
    }

    async findUserByName(userName: String){
        const user = await DBUserModel.findOne({ name: userName }).exec()
        return user
    }


    async findUserWithToken(token: string): Promise<string> {
        const user = await DBUserModel.findOne({ token: token }).exec()
        if(!user){
            throw UserDBErrors.TokenNotExisting()
        }
        return user.name
    }
    
}
type DBUserModelType<T extends Document> = PaginateModel<T>

export const DBUserModel = model<DBUser>('User', DBUserSchema) as DBUserModelType<DBUser>