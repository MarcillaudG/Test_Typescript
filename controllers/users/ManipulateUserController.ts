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
        
    }

    async listUsers(): Promise<JSON[]> {
        // GET user here
        const allusers = this.userModel.getAllUsers()
        
        return allusers;
    }


}

