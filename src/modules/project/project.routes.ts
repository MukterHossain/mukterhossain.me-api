import { Router } from "express";
import { ProjectController } from "./project.controller";

let router = Router()


router.use("/", ProjectController.createUser)

export const ProjectRouter = router

