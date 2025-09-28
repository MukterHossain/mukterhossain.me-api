import { Router } from "express";
import { AuthController } from "./auth.controller";


let router = Router()


router.post("/login", AuthController.createUser)

export const AuthRouter = router

