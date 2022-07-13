export default class UserModel {

    private users: JSON[]

    constructor(){
        this.users = []
    }

    addTemporaryUser(name: String, token: String){
        const user:JSON = <JSON><unknown>{
            "name": name,
            "token": token
        }
        this.users.push(user)
    }

    getAllUsers(): JSON[]{
        return this.users
    }
}