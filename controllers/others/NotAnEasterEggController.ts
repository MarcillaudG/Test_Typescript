import {FastifyInstance} from "fastify";

export default class NotAnEasterEggController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/timemachine/logs/mcfly',
            this.easterEgg.bind(this))
    }


    async easterEgg(): Promise<String> {
        const jsonTab = [
            <JSON><unknown>{
            "name": "My mom is in love with me",
            "version": "1.0",
            "time": -446723100
        },
        <JSON><unknown>{
            "name": "I go to the future and my mom end up with the wrong guy",
            "version": "2.0",
            "time": 1445470140
        },
        <JSON><unknown>{
            "name": "I go to the past and you will not believe what happens next",
            "version": "3.0",
            "time": Number.MIN_SAFE_INTEGER
        }
    
    ]
        let res:String[] = []
        jsonTab.forEach(obj =>{
            res.push(JSON.stringify(obj))
        }
            )
        return res.toString();
    }

}

