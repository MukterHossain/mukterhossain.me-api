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
exports.BlogController = void 0;
const blog_service_1 = require("./blog.service");
const client_1 = require("@prisma/client");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blog_service_1.BlogService.createBlog(req.body);
        res.status(201).json({
            success: true,
            message: "Blog createdsuccessfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        });
    }
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const slug = req.query.slug || "";
        const result = yield blog_service_1.BlogService.getAllBlogs({ page, limit, search, slug });
        res.status(201).json({
            success: true,
            message: "Blog retrived blogs data successfully",
            result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrive blog data: ${error}`,
        });
    }
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blog_service_1.BlogService.getBlogById(req.params.id);
        res.status(201).json({
            success: true,
            message: "Blog retrived single data successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrive blog data: ${error}`,
        });
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog id is required"
            });
        }
        const result = yield blog_service_1.BlogService.updateBlog(id, data);
        res.status(201).json({
            success: true,
            message: "Blog data updated successfully",
            data: result
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Slug already exists. Please use a different slug"
            });
        }
        res.status(500).send({
            success: false,
            message: `Failed to blog data: ${error}`,
        });
    }
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blog_service_1.BlogService.deleteBlog(req.params.id);
        res.status(201).json({
            success: true,
            message: "Blog data deleted successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to blog data delete: ${error}`,
        });
    }
});
exports.BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
