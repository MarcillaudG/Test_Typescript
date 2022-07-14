import HttpGateway from "./HttpGateway";
import ExampleController from "./controllers/others/ExampleController";
import HealtCheckController from "./controllers/others/HealtCheckController";
import NotAnEasterEggController from "./controllers/others/NotAnEasterEggController";
import RegisterUserController from "./controllers/users/RegisterUser";
import UserModel from "./models/UserModel";
import ManipulateUserController from "./controllers/users/ManipulateUserController";
import GitController from "./controllers/git/GitController";
import dotenv from 'dotenv';
import { UserDB } from "./database/UserDB";

(async function main() {
    dotenv.config()
    // Init Fastify router
    const http = new HttpGateway()

    //UserDB
    const db = new UserDB()
    db.connectToDatabase(String(process.env.DB_CONN_STRING), String(process.env.DB_NAME))

    //Models
    let userModel = new UserModel(db)

    // Controllers
    new ExampleController(http.router)
    new HealtCheckController(http.router)
    new NotAnEasterEggController(http.router)
    new RegisterUserController(http.router, userModel)
    new ManipulateUserController(http.router, userModel)
    new GitController(http.router)

    // Fastify router start
    await http.start()
})()
