import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const blogs = await prisma.blog.create({
        data: payload,
        include: {
            owner: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        }
    })
    return blogs
}
const getAllBlogs = async ({ page = 1, limit = 10, search = "", slug = "" }) => {
    const skip = (page - 1) * limit

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } }
                ]
            }
        ].filter(Boolean)
    }

    const blogs = await prisma.blog.findMany({
        skip,
        take: limit,
        where,
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    phone: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        },
        orderBy: { createdAt: "desc" }
    })
    const total = await prisma.blog.count({ where: { title: { contains: search } } })
    return {
        blogs,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    }
}
const getBlogById = async (id: string) => {

    const blog = await prisma.blog.findUnique(
        {
            where: { id },
            select: {
                id: true,
                title: true,
                slug: true,
                content: true,
                thumbnail: true,
                published: true,
                createdAt: true,
                excerpt: true,
                updatedAt: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })

    return {
        blog
    }
}
const updateBlog = async (id: string, data: Partial<any>): Promise<Blog> => {

    const blog = await prisma.blog.update({
        where: { id },
        data
    })

    return blog
}
const deleteBlog = async (id: string) => {

    const blog = await prisma.blog.delete({
        where: { id }
    })

    return null
}



export const BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}