
import { prisma } from "../../config/db"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const loginUser = async(email:string, password:string) =>{
    const user = await prisma.user.findUnique({where:{email},
    select:{
        id:true,
        email:true,
        name:true,
        role:true,
        phone:true,
        image:true,
        status:true,
        password:true,
        createdAt:true,
        updatedAt:true
    }})
    if(!user){
        throw new Error("User not found")
    }
    const isMatch = await bcrypt.compare(password, user.password )
    if(!isMatch){
        throw new Error("Invalid credentials. Password not matched")
    }

    const {password: _, ...withoutpassword} = user;
 

const token = jwt.sign(
    { id:user.id, role:user.role},
    process.env.JWT_ACCESS_SECRET! ,
    {expiresIn: process.env.JWT_ACCESS_EXPIRE || "2d"} as jwt.SignOptions
)
return {
    user: withoutpassword,
    token
}
}
const getUser = async(email:string) =>{
    const user = await prisma.user.findUnique({where:{email},
    select:{
        id:true,
        name:true,
        email:true,
        role:true,
        phone:true,
        image:true,
        status:true,
        password:true,
        createdAt:true,
        updatedAt:true
    }})
    if(!user){
        throw new Error("User not found")
    }
    

    const {password: _, ...withoutpassword} = user;
 


return {
    user: withoutpassword,
}
}
const getDashboardData = async(ownerId:string) =>{
    const totalBlogs = await prisma.blog.count({where:{ownerId}});
    const publishedBlogs = await prisma.blog.count({where:{ownerId, published:true}});
    const totalProjects = await prisma.project.count({where:{ownerId}});
    const recentBlogs = await prisma.blog.findMany({
        where:{ownerId},
        orderBy:{createdAt:"desc"},
        take:5,
    })
    const recentProjects = await prisma.project.findMany({
        where:{ownerId},
        orderBy:{createdAt:"desc"},
        take:5,
    })
   


return {
    stats:{
        totalBlogs,
        publishedBlogs,
        totalProjects,
    },
    recentBlogs,
    recentProjects
}
}



export const AuthService = {
    loginUser,
    getUser,
    getDashboardData
}