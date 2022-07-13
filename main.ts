import HttpGateway from "./HttpGateway";
import ExampleController from "./controllers/ExampleController";

(async function main() {
    // Init Fastify router
    const http = new HttpGateway()


    // Controllers
    new ExampleController(http.router)

    // Fastify router start
    await http.start()
})()
