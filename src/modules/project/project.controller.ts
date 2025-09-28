import { Request, Response } from "express";
import { ProjectService } from "./project.service";


const createUser = async(req:Request, res:Response) =>{
      try {
        const result = await ProjectService.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        })
    } 

}


export const ProjectController ={
    createUser
}