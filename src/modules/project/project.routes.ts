import { Router } from "express";
import { ProjectController } from "./project.controller";

let router = Router()


router.post("/", ProjectController.createProject)
router.get("/", ProjectController.getAllProjects)
router.get("/:id", ProjectController.getProjectById)
router.patch("/:id", ProjectController.updateProject)
router.delete("/:id", ProjectController.deleteProject)

export const ProjectRouter = router

