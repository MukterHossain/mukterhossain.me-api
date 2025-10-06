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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            image: true,
            status: true,
            password: true,
            createdAt: true,
            updatedAt: true
        } });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials. Password not matched");
    }
    const { password: _ } = user, withoutpassword = __rest(user, ["password"]);
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE || "2d" });
    return {
        user: withoutpassword,
        token
    };
});
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            image: true,
            status: true,
            password: true,
            createdAt: true,
            updatedAt: true
        } });
    if (!user) {
        throw new Error("User not found");
    }
    const { password: _ } = user, withoutpassword = __rest(user, ["password"]);
    return {
        user: withoutpassword,
    };
});
const getDashboardData = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalBlogs = yield db_1.prisma.blog.count({ where: { ownerId } });
    const publishedBlogs = yield db_1.prisma.blog.count({ where: { ownerId, published: true } });
    const totalProjects = yield db_1.prisma.project.count({ where: { ownerId } });
    const recentBlogs = yield db_1.prisma.blog.findMany({
        where: { ownerId },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
    const recentProjects = yield db_1.prisma.project.findMany({
        where: { ownerId },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
    return {
        stats: {
            totalBlogs,
            publishedBlogs,
            totalProjects,
        },
        recentBlogs,
        recentProjects
    };
});
exports.AuthService = {
    loginUser,
    getUser,
    getDashboardData
};
