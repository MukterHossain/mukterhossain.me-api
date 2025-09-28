import { Router } from "express";
import { ProjectController } from "./project.controller";

let router = Router()


router.post("/", ProjectController.createProject)
router.get("/", ProjectController.getAllProjects)
router.get("/:id", ProjectController.getProjectById)

export const ProjectRouter = router

