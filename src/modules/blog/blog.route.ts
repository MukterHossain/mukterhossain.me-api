import { Router } from "express";
import { BlogController } from "./blog.controller";


let router = Router()


router.post("/", BlogController.createBlog)
router.get("/", BlogController.getAllBlogs)
router.get("/:id", BlogController.getBlogById)
router.patch("/:id", BlogController.updateBlog)
router.delete("/:id", BlogController.deleteBlog)

export const BlogRouter = router

