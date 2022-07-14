import { UserModelErrors } from "./errors/UserModelError"
import { UserDB } from "../database/UserDB"


export default class UserModel {

    private users: JSON[]
    private connections: JSON[]
    private db: UserDB

    constructor(dbconnection: UserDB){
        this.users = []
        this.connections = []
        this.db = dbconnection
    }

    addTemporaryUser(name: String, token: String):void{
        const user:JSON = <JSON><unknown>{
            "name": name,
            "token": token
        }
        let exist = false
        this.users.forEach(obj=> {
            const user = JSON.parse(JSON.stringify(obj))
            if (user.name === name) {
                throw UserModelErrors.UserAlreadyRegistered()
            }
        });
        this.users.push(user)
    }

    addPermanentUser(name: string, password: string, token:string):void{
        this.db.createUser(name, password, token)
    }

    updatePermanentUserToken(name: string, token: string):void{
        this.db.updateUserToken(name, token)
    }

    addTemporaryToken(name: String, token: String):void{
        const user:JSON = <JSON><unknown>{
            "name": name,
            "token": token
        }
        this.connections.push(user)
    }

    isUserInDatabase(name: string):boolean{
        const user = this.db.findUserByName(name)
        if(!user){
            return false
        }
        return true
    }

    findUserWithToken(token: string):Promise<string>{
        const username = this.db.findUserWithToken(token)
        return username
    }

    getAllUsers(): JSON[]{
        return this.users
    }


    getConnections(): JSON[]{
        return this.connections
    }
}