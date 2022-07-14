import {FastifyInstance} from "fastify";
const axios = require('axios').default;



const ttl: number = 3_600_000 // 1 hour
export default class GitController {

    private router: FastifyInstance
    private dataEvents: string
    private updateEventsAt: number
    private updateUserAt: Map<string, {data: string, accessTime: number}>


    constructor(router: FastifyInstance) {
        this.router = router
        this.dataEvents = ""
        this.updateEventsAt = 0
        this.updateUserAt = new Map<string, {data: string, accessTime: number}>()


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
                let isFresh = false

                //Check if a request is necessary or if we can use cache
                if (this.updateUserAt.has(user)){

                    isFresh = (Date.now() - this.updateUserAt.get(user)!.accessTime) < ttl
                }
                if (isFresh){
                    console.log("Cached Data Used")
                    return this.updateUserAt.get(user)!.data
                }
                let api = 'https://api.github.com/users/' + user

                // need to store the result in cach
                const res = axios.get(api).then(function(response: { data: any; }) {
                    let github = response.data;
                    
                    const res = `{ "id": ${github.id}, "login": ${github.login}, "avatar": ${github.avatar_url}, "details": {
                        "public_repos": ${github.public_repos} "public gists": ${github.public_gists} "followers": ${github.followers} "following"! ${github.following}
                     } }`
                    reply.send(res)
                    return res
                });
                // Store the result in the map
                this.updateUserAt.set(user, {data: res, accessTime: Date.now()})
            }
        })
    }


    async gitFeed(): Promise<String> {
        // TODO Error token
        
        const isFresh = (Date.now() - this.updateEventsAt) < ttl

        // If cached just return the old value
        if (isFresh){
            console.log("Cache Used")
            return this.dataEvents
        }
        let res:String[] = []
        const response = await axios.get('https://api.github.com/events', {
            method: "GET",
            headers: {
              'Authorization': `token ${process.env.TOKEN_GITHUB}`,
            }
          });
        console.log(await response);
        response.data.forEach((obj: { type: any; actor: { id: any; login: any; }; repo: { id: any; name: any; }; }) => {
            res.push(` { "type": "${String(obj.type)}, "actor": { "id": ${String(obj.actor.id)}, "login": ${String(obj.actor.login)} }, "repo" : { "id": ${String(obj.repo.id)}, "name": ${String(obj.repo.name)}}}`)
        });
        // Don't forget to store the Data in cache
        this.dataEvents = res.toString()
        this.updateEventsAt = Date.now()
        return res.toString()
    }


}

