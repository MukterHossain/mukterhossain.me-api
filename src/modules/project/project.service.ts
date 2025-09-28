import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"

const createUser = async(payload: Prisma.UserCreateInput):Promise<User> =>{
const createUser = await prisma.user.create({
    data:payload
})
return createUser
}



export const ProjectService = {
    createUser
}