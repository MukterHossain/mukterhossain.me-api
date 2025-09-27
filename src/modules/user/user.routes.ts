import app from "../../app";
import { UserController } from "./user.controller";

let router = app


app.use("/", UserController.createUser)

export const UserRouter = router

