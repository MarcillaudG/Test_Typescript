import {FastifyInstance} from "fastify";
import UserModel from "../../models/UserModel";
import {generateString} from "../../utils/stringGenerators"

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
                //const token = generateString(Number(process.env.TOKEN_SIZE))
                const token = generateString(10)
                const access:JSON = <JSON><unknown>{
                    "name": name,
                    "token": token
                }
                reply.send(access)
            }
        })


        
    }

    async listUsers(): Promise<JSON[]> {
        // GET user here
        const allusers = this.userModel.getAllUsers()
        
        return allusers;
    }


}

