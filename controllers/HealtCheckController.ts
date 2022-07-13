import {FastifyInstance} from "fastify";

export default class HealtCheckController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/healthcheck',
            this.healthCheck.bind(this))
    }


    async healthCheck(): Promise<JSON> {
        const healthCheck:JSON = <JSON><unknown>{
            "name": "github-api",
            "version": "1.0",
            "time": Date.now()
        }
        return healthCheck;
    }

}

