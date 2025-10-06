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
exports.ProjectService = void 0;
const db_1 = require("../../config/db");
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createProject = yield db_1.prisma.project.create({
        data: payload
    });
    return createProject;
});
const getAllProjects = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, search = "" }) {
    const skip = (page - 1) * limit;
    const where = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { features: { contains: search, mode: "insensitive" } }
                ]
            }
        ].filter(Boolean)
    };
    const projects = yield db_1.prisma.project.findMany({
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
    });
    const total = yield db_1.prisma.blog.count({ where: { title: { contains: search } } });
    return {
        projects,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    };
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            description: true,
            features: true,
            createdAt: true,
            liveUrl: true,
            repoUrl: true,
            thumbnail: true,
            owner: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        }
    });
    // console.log(project)
    return { project };
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.update({
        where: { id },
        data: payload
    });
    return project;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.delete({
        where: { id }
    });
    return null;
});
exports.ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
