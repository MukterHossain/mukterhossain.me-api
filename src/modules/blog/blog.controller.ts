
import { Request, Response } from "express";
import { BlogService } from "./blog.service";


const createBlog = async(req:Request, res:Response) =>{
      try {
        const result = await BlogService.createBlog(req.body)
        res.status(201).json({
            success: true,
            message: "Blog createdsuccessfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        })
    } 

}
const getAllBlogs = async(req:Request, res:Response) =>{
      try {
        const page = Number(req.query.page ) || 1
        const limit = Number(req.query.limit) || 10
        const search = (req.query.search as string) || ""
        const slug = (req.query.slug as string) || ""
        const result = await BlogService.getAllBlogs({page, limit, search, slug})
        res.status(201).json({
            success: true,
            message: "Blog createdsuccessfully",
            result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        })
    } 

}
const getBlogById = async(req:Request, res:Response) =>{
      try {
        
        const result = await BlogService.getBlogById(req.params.id)
        res.status(201).json({
            success: true,
            message: "Blog createdsuccessfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        })
    } 

}


export const BlogController ={
    createBlog,
    getAllBlogs,
    getBlogById
}