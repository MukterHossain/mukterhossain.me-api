import { Router } from "express";
import { AuthController } from "./auth.controller";


let router = Router()


router.post("/login", AuthController.createUser)
router.get("/owner/:email", AuthController.getUser)

export const AuthRouter = router

