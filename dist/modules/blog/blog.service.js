"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield db_1.prisma.blog.create({
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
    });
    return blogs;
});
const getAllBlogs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, search = "", slug = "" }) {
    const skip = (page - 1) * limit;
    const where = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } }
                ]
            }
        ].filter(Boolean)
    };
    const blogs = yield db_1.prisma.blog.findMany({
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
    });
    const total = yield db_1.prisma.blog.count({ where: { title: { contains: search } } });
    return {
        blogs,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    };
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.findUnique({
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
    });
    return {
        blog
    };
});
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.update({
        where: { id },
        data
    });
    return blog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.delete({
        where: { id }
    });
    return null;
});
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
