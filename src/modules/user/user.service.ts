import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";

const registerUserIntoDB = async (payload : any) => {
     const {name, email, password} = payload;

    

    const isUserExist = await prisma.user.findUnique(
        {where : {email}}
    );
    if (isUserExist) {
        throw new Error("User with this email already exists");
    }

     const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data : {
            name,
            email,
            password: hashPassword,

        },
        omit : {
            password: true
        }
    });

    return user;
};



export const userService = {
    registerUserIntoDB,
    
}