
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


export const BlogController ={
    createBlog
}