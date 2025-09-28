import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async(req:Request, res:Response) =>{
      try {
        const result = await UserService.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        })
    } 

}


export const UserController ={
    createUser
}