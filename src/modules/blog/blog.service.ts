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



export const BlogService = {
    createBlog
}