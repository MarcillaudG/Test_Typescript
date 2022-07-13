import {FastifyInstance} from "fastify";
import { writeFileSync } from "fs";
import UserModel from "../../models/UserModel";
import {generateString} from "../../utils/stringGenerators"

export default class RegisterUserController {

    private router: FastifyInstance

    constructor(router: FastifyInstance, userModel: UserModel) {
        this.router = router
        this.router.route({
            method: 'GET',
            url: '/api/users/register',
            schema: {
                querystring: {
                    name: { type: 'string' },
                    password: {type: 'string'}
                }
            },
            handler: async (request, reply) => {
                let splitted = request.url.split("?")
                const name = splitted[1].split("=")[1]
                //const password = splitted[2].split("=")[1]
                //const token = generateString(Number(process.env.TOKEN_SIZE))
                const token = generateString(10)
                const user:JSON = <JSON><unknown>{
                    "name": name,
                    "token": token
                }
                writeFileSync("./datafiles/users.txt", JSON.stringify(user), {
                    flag: 'a'
                })
                userModel.addTemporaryUser(name, token)
                reply.send(user)
            }
        })
    }



}

