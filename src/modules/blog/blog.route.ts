import { Router } from "express";
import { BlogController } from "./blog.controller";


let router = Router()


router.post("/", BlogController.createBlog)
router.get("/", BlogController.getAllBlogs)

export const BlogRouter = router

