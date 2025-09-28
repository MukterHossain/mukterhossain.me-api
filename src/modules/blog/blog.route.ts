import { Router } from "express";
import { BlogController } from "./blog.controller";


let router = Router()


router.post("/", BlogController.createBlog)
router.get("/", BlogController.getAllBlogs)
router.get("/:id", BlogController.getBlogById)
router.patch("/:id", BlogController.updateBlog)

export const BlogRouter = router

