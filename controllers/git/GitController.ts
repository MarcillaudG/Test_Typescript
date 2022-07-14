import {FastifyInstance} from "fastify";
const axios = require('axios').default;




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

                let api = 'https://api.github.com/users/' + user
                axios.get(api).then(function(response: { data: any; }) {
                    let github = response.data;
                    
                    const res = `{ "id": ${github.id}, "login": ${github.login}, "avatar": ${github.avatar_url}, "details": {
                        "public_repos": ${github.public_repos} "public gists": ${github.public_gists} "followers": ${github.followers} "following"! ${github.following}
                     } }                 `
                    reply.send(res)
                });
            }
        })
    }


    async gitFeed(): Promise<String> {

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
        return res.toString()
    }



}

