import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const createUser = async(req:Request, res:Response) =>{
      try {
        const {email, password} = req.body;
        const {user, token} = await AuthService.loginUser(email, password)
        
        res.status(201).json({
            success: true,
            message: "User Login successfully",
            user,
            token
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to login user: ${error}`,
        })
    } 

}
const getUser = async(req:Request, res:Response) =>{
      try {
        const email = req.params.email as string;
        const {user} = await AuthService.getUser(email)
        
        res.status(200).json({
            success: true,
            message: "User data successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to user data: ${error}`,
        })
    } 

}
const getDashboardData = async(req:Request, res:Response) =>{
      try {
        const ownerId = req.params.ownerId as string;
        if(!ownerId){
            res.status(400).json({
                success: false,
                message: "OwnerId is required",
            })
        }
        const dashboardData = await AuthService.getDashboardData(ownerId)
        
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            dashboardData
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to user data: ${error}`,
        })
    } 

}


export const AuthController ={
    createUser,
    getUser,
    getDashboardData
}