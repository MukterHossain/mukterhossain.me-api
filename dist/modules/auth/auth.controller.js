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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield auth_service_1.AuthService.loginUser(email, password);
        res.status(201).json({
            success: true,
            message: "User Login successfully",
            user,
            token
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to login user: ${error}`,
        });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const { user } = yield auth_service_1.AuthService.getUser(email);
        res.status(200).json({
            success: true,
            message: "User data successfully",
            user
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to user data: ${error}`,
        });
    }
});
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.params.ownerId;
        if (!ownerId) {
            res.status(400).json({
                success: false,
                message: "OwnerId is required",
            });
        }
        const dashboardData = yield auth_service_1.AuthService.getDashboardData(ownerId);
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            dashboardData
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to user data: ${error}`,
        });
    }
});
exports.AuthController = {
    createUser,
    getUser,
    getDashboardData
};
