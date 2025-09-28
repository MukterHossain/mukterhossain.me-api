import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createBlog = async(payload: Prisma.BlogCreateInput):Promise<Blog> =>{
const blogs = await prisma.blog.create({
    data:payload,
    include:{
        owner:{
            select:{
                name:true,
                email:true,
                image:true
            }
        }
    }
})
return blogs
}
const getAllBlogs = async({page=1, limit=10, search="", slug=""})=>{
    const skip = (page-1) * limit

    const where: any ={
        AND:[
            search && {
                OR:[
                    {title: {contains: search, mode: "insensitive"}},
        {slug: {contains: search, mode: "insensitive"}}
                ]
            }
        ].filter(Boolean)
    }

const blogs = await prisma.blog.findMany({
    skip,
    take:limit,
    where,
    include:{
        owner:{
            select:{
                name:true,
                email:true,
                image:true
            }
        }
    },
    orderBy:{createdAt:"desc"}
})
const total = await prisma.blog.count({where:{title: {contains: search}}})
return {
    blogs,
    pagination:{
        page,
        limit,
        total,
        totalPage: Math.ceil(total/limit)
    }
}
}



export const BlogService = {
    createBlog,
    getAllBlogs
}