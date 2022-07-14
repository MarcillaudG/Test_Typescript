import {FastifyInstance} from "fastify";
import { Octokit } from "@octokit/rest";
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
                let github = ""
                axios.get(api).then(function(response: { data: any; }) {
                github = response.data;
                reply.send(JSON.stringify(github))
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

