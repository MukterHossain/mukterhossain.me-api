import { Request, Response } from "express";
import { ProjectService } from "./project.service";


const createProject = async(req:Request, res:Response) =>{
      try {
        const result = await ProjectService.createProject(req.body)
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create project: ${error}`,
        })
    } 

}
const getAllProjects = async(req:Request, res:Response) =>{
    const page = Number(req.query.page ) || 1
        const limit = Number(req.query.limit) || 10
        const search = (req.query.search as string) || ""
        // const features = (req.query.features as string[]) || ""
      try {
        const result = await ProjectService.getAllProjects({page, limit, search})
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create project: ${error}`,
        })
    } 

}


export const ProjectController ={
    createProject,
    getAllProjects
}