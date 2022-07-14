import { UserModelErrors } from "./errors/UserModelError"


export default class UserModel {

    private users: JSON[]
    private connections: JSON[]

    constructor(){
        this.users = []
        this.connections = []
    }

    addTemporaryUser(name: String, token: String){
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

    addTemporaryToken(name: String, token: String){
        const user:JSON = <JSON><unknown>{
            "name": name,
            "token": token
        }
        this.connections.push(user)
    }

    getAllUsers(): JSON[]{
        return this.users
    }

    getConnections(): JSON[]{
        return this.connections
    }
}