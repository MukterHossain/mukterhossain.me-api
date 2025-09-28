import { Router } from "express";
import { BlogController } from "./blog.controller";


let router = Router()


router.post("/", BlogController.createBlog)

export const BlogRouter = router

