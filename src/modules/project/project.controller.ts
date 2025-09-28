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
            message: "Project data retrieved  successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to project data retrieve: ${error}`,
        })
    } 

}
const getProjectById = async(req:Request, res:Response) =>{
    console.log("get id", req.params.id)
    try {
        const result = await ProjectService.getProjectById(req.params.id)
        if(!result.project){
            return res.status(404).json({
                success:false,
                message: "Project not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Retrieved single project successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrieve single project: ${error}`,
        })
    } 

}
const updateProject = async(req:Request, res:Response) =>{
    
    try {
        const result = await ProjectService.updateProject(req.params.id, req.body)
      

        res.status(200).json({
            success: true,
            message: "Updated single project successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to update single project: ${error}`,
        })
    } 

}
const deleteProject = async(req:Request, res:Response) =>{
    
    try {
        const result = await ProjectService.deleteProject(req.params.id)
      

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to daata delete: ${error}`,
        })
    } 

}


export const ProjectController ={
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}