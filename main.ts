import HttpGateway from "./HttpGateway";
import ExampleController from "./controllers/ExampleController";
import HealtCheckController from "./controllers/HealtCheckController";

(async function main() {
    // Init Fastify router
    const http = new HttpGateway()


    // Controllers
    new ExampleController(http.router)
    new HealtCheckController(http.router)

    // Fastify router start
    await http.start()
})()
