import {FastifyInstance} from "fastify";
import UserModel from "../../models/UserModel";
import {generateString} from "../../utils/stringGenerators"
import { UserErrors } from "../errors/UserErrors";

export default class ManipulateUserController {

    private router: FastifyInstance
    private userModel: UserModel

    constructor(router: FastifyInstance, userModel: UserModel) {
        this.router = router
        this.userModel = userModel
        router.get('/api/users',
            this.listUsers.bind(this))


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
                while (i < allusers.length && !found){
                    let user = JSON.parse(JSON.stringify(allusers[i]))
                    if (user.name === name){
                        found = true
                    }
                    i++;
                }
                
                if (! found){
                    throw UserErrors.UserNotFound(name)
                }

                const token = generateString(Number(process.env.TOKEN_SIZE))
                //const token = generateString(10)
                const access:JSON = <JSON><unknown>{
                    "name": name,
                    "token": token
                }
                //reply.send(access)
                this.userModel.addTemporaryToken(name, token)
                reply.redirect('/api/users/me?token='+token)
            }
        })

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
                const connections = this.userModel.getConnections()
                while (i < connections.length && !found){
                    let user = JSON.parse(JSON.stringify(connections[i]))
                    if (user.token === token){
                        found = true
                        username = user.name
                    }
                    i++;
                }
                if (!found){
                    throw UserErrors.WrongToken()
                }
                const user:JSON = <JSON><unknown>{
                    "username": username
                }
                reply.send(user)
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
