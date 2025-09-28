import { Prisma, Project} from "@prisma/client"
import { prisma } from "../../config/db"

const createProject = async(payload: Prisma.ProjectCreateInput):Promise<Project> =>{
const createProject = await prisma.project.create({
    data:payload
})
return createProject
}

const getAllProjects = async ({ page = 1, limit = 10, search = ""}) => {
    const skip = (page - 1) * limit

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { features: { contains: search, mode: "insensitive" } }
                ]
            }
        ].filter(Boolean)
    }

    const projects = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        include: {
            owner: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        },
        orderBy: { createdAt: "desc" }
    })
    const total = await prisma.blog.count({ where: { title: { contains: search } } })
    return {
        projects,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    }
}
const getProjectById = async (id:string) => {
    const project = await prisma.project.findUnique({
        where: {id},
        select:{
            id:true,
            title:true,
            description:true,
            features:true,
            createdAt:true,
            liveUrl:true,
            repoUrl:true,
            thumbnail:true,
            owner: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        }
    })
    console.log(project)
    return {project}
}
const updateProject = async (id:string, payload:Prisma.ProjectUpdateInput):Promise<Project> => {
    const project = await prisma.project.update({
        where: {id},
        data:payload
        
    })
    return project
}



export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject
}