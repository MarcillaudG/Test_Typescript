import HttpGateway from "./HttpGateway";
import ExampleController from "./controllers/ExampleController";
import HealtCheckController from "./controllers/HealtCheckController";
import NotAnEasterEggController from "./controllers/NotAnEasterEggController";
import RegisterUserController from "./controllers/users/RegisterUser";
import UserModel from "./models/UserModel";
import ManipulateUserController from "./controllers/users/ManipulateUserController";

(async function main() {
    // Init Fastify router
    const http = new HttpGateway()

    //Models
    let userModel = new UserModel()

    // Controllers
    new ExampleController(http.router)
    new HealtCheckController(http.router)
    new NotAnEasterEggController(http.router)
    new RegisterUserController(http.router, userModel)
    new ManipulateUserController(http.router, userModel)

    // Fastify router start
    await http.start()
})()
