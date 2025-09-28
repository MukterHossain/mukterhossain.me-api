import { Router } from "express";
import { UserController } from "./user.controller";

let router = Router()


router.use("/", UserController.createUser)

export const UserRouter = router

