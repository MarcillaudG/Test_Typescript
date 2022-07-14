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
                    /*let res:String[] = []
                    github.forEach((obj: { id: any; login: any; avatar_url: any; public_repos: any; public_gists: any; followers: any; following: any; }) => {
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
                    
                    const res = `{ "id": ${github.id}, "login": ${github.login}, "avatar": ${github.avatar_url}, "details": {
                        "public_repos": ${github.public_repos} "public gists": ${github.public_gists} "followers": ${github.followers} "following"! ${github.following}
                     } }                 `
                    reply.send(res)
                });
            }
        })
    }


    async gitFeed(): Promise<String> {

        let res = "Hello"
        const response = await axios.get('https://api.github.com/events', {
            method: "GET",
            headers: {
              'Authorization': `token ${process.env.TOKEN_GITHUB}`,
            }
          });
        console.log(await response);
        return JSON.stringify(response.data)
    }



}

