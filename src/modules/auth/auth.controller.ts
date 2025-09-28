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


export const AuthController ={
    createUser
}