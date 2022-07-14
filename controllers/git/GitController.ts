import {FastifyInstance} from "fastify";
import { Octokit } from "@octokit/rest";


export default class GitController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/github/feed',
            this.gitFeed.bind(this))
    }


    async gitFeed(): Promise<String> {

        const token = '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'
        const octokit = new Octokit({
            auth: token
          })
        const response = await octokit.request('GET /events', {})
        let res:String[] = []
        response.data.forEach(obj => {
            res.push(` { "type": "${String(obj.type)}, "actor": { "id": ${String(obj.actor.id)}, "login": ${String(obj.actor.login)} }, "repo" : { "id": ${String(obj.repo.id)}, "name": ${String(obj.repo.name)}}}`)
        });
        return res.toString()
    }

}

