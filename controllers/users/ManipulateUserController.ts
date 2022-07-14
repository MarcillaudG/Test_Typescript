import {FastifyInstance} from "fastify";
import UserModel from "../../models/UserModel";
import {generateString} from "../../utils/StringGenerators"
import { UserErrors } from "../errors/UserErrors";

export default class ManipulateUserController {

    private router: FastifyInstance
    private userModel: UserModel

    constructor(router: FastifyInstance, userModel: UserModel) {
        this.router = router
        this.userModel = userModel
        router.get('/api/users',
            this.listUsers.bind(this))


        // Used to log a user
        // Immediately redirect to the page '/me'
        this.router.route({
            method: 'GET',
            url: '/api/users/login',
            schema: {
                querystring: {
                    name: { type: 'string' },
                    password: {type: 'string'}
                }
            },
            handler: async (request, reply) => {
                let splitted = request.url.split("?")
                const name = splitted[1].split("=")[1]

                let i = 0
                const allusers = this.userModel.getAllUsers()
                let found = false
                // Deprecated, used when stored in memory
                /*while (i < allusers.length && !found){
                    let user = JSON.parse(JSON.stringify(allusers[i]))
                    if (user.name === name){
                        found = true
                    }
                    i++;
                }*/
                found = this.userModel.isUserInDatabase(name)
                
                if (! found){
                    throw UserErrors.UserNotFound(name)
                }

                const token = generateString(Number(process.env.TOKEN_SIZE))
                const access:JSON = <JSON><unknown>{
                    "name": name,
                    "token": token
                }
                //reply.send(access)
                // Store in Memory
                this.userModel.addTemporaryToken(name, token)
                // Store in MongoDB
                this.userModel.updatePermanentUserToken(name, token)
                reply.redirect('/api/users/me?token='+token)
            }
        })

        // 
        this.router.route({
            method: 'GET',
            url: '/api/users/me',
            schema: {
                querystring: {
                    name: { type: 'string' },
                    password: {type: 'string'}
                }
            },
            handler: async (request, reply) => {
                let splitted = request.url.split("?")
                const token = splitted[1].split("=")[1]
                
                let i = 0
                let found = false
                let username = "Unknown"
                // Deprecated, used when stored in memory
                /*const connections = this.userModel.getConnections()
                while (i < connections.length && !found){
                    let user = JSON.parse(JSON.stringify(connections[i]))
                    if (user.token === token){
                        found = true
                        username = user.name
                    }
                    i++;
                }*/
                username = await this.userModel.findUserWithToken(token)
                if (!username){
                    throw UserErrors.WrongToken()
                }
                const user:JSON = <JSON><unknown>{
                    "username": username
                }
                reply.send(JSON.stringify(user))
            }
        })


        
    }

    async listUsers(): Promise<JSON[]> {
        // GET user here
        const allusers = this.userModel.getAllUsers()
        
        return allusers;
    }


    
}
interface User {
    username: String;
    token: String;
}
