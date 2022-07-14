import {FastifyInstance} from "fastify";
import { Octokit } from "@octokit/rest";




export default class GitController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/github/feed',
            this.gitFeed.bind(this))

            this.router.route({
                method: 'GET',
                url: '/api/github/users/*',
                schema: {
                    querystring: {
                        name: { type: 'string' },
                        password: {type: 'string'}
                    }
                },
                handler: async (request, reply) => {
                    let splitted = request.url.split("/")
                    const user = splitted[splitted.length-1]
    
                    const octokit = new Octokit({
                        auth: process.env.TOKEN_GITHUB
                      })
                    const response = await octokit.request('GET /user/{username}', {
                        username: "MarcillaudG"
                    })
                    /*
                    let res:String[] = []
                    response.data.forEach((obj: { id: any; login: any; avatar_url: any; public_repos: any; public_gists: any; followers: any; following: any; }) => {
                        res.push(` 
                        "id": ${obj.id},
                        "login": ${obj.login},
                        "avatar": ${obj.avatar_url},
                        "details":
                            { 
                            "public_repos": ${obj.public_repos}
                            "public_gists": ${obj.public_gists}
                            "followers": ${obj.followers}
                            "following": ${obj.following}
                        }`)
                    })*/
                    reply.send("Hello")
                }
            })
    }


    async gitFeed(): Promise<String> {

        const octokit = new Octokit({
            auth: process.env.TOKEN_GITHUB
          })
        const response = await octokit.request('GET /events', {})
        let res:String[] = []
        response.data.forEach(obj => {
            res.push(` { "type": "${String(obj.type)}, "actor": { "id": ${String(obj.actor.id)}, "login": ${String(obj.actor.login)} }, "repo" : { "id": ${String(obj.repo.id)}, "name": ${String(obj.repo.name)}}}`)
        });
        return res.toString()
    }


}

