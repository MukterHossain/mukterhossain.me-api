
import bcrypt from "bcryptjs";
import { prisma } from "../src/config/db";
import dotenv from "dotenv";

dotenv.config()


async function main(){
    const hashedPassword = await bcrypt.hash(process.env.OWNER_PASSWORD as string, Number(process.env.BCRYPT_SALT_ROUND))
    const owner = await prisma.user.upsert({
        where: {email: process.env.OWNER_EMAIL as string},
        update:{},
        create:{
            name: "MD MUKTER HOSSAIN",
            email: process.env.OWNER_EMAIL as string,
            password: hashedPassword,
            phone: process.env.OWNER_PHONE as string,
            image:process.env.OWNER_IMAGE as string,
            role: "owner",
            status: "active"
        }
    })
    console.log("✅ Owner create successfully.", owner);
}
console.log("📦 ENV TEST:", process.env.OWNER_PHONE, process.env.OWNER_IMAGE);
main()
.then(async()=>{
    await prisma.$disconnect()

})
.catch(async(err) =>{
    console.error("❌ Database Connection Error", err)
    await prisma.$disconnect()
    process.exit(1)
})