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
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.createProject(req.body);
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create project: ${error}`,
        });
    }
});
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    // const features = (req.query.features as string[]) || ""
    try {
        const result = yield project_service_1.ProjectService.getAllProjects({ page, limit, search });
        res.status(201).json({
            success: true,
            message: "Project data retrieved  successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to project data retrieve: ${error}`,
        });
    }
});
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get id", req.params.id);
    try {
        const result = yield project_service_1.ProjectService.getProjectById(req.params.id);
        if (!result.project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Retrieved single project successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrieve single project: ${error}`,
        });
    }
});
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Project id is required"
        });
    }
    try {
        const result = yield project_service_1.ProjectService.updateProject(id, req.body);
        res.status(200).json({
            success: true,
            message: "Updated single project successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to update single project: ${error}`,
        });
    }
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.deleteProject(req.params.id);
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to daata delete: ${error}`,
        });
    }
});
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
