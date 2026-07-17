import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ILogInUser } from "./auth.interface";

const registerUserIntoDB = async (payload : any) => {
     const {name, email, password} = payload;

    const isUserExist = await prisma.user.findUnique(
        {where : {email}}
    );
    if (isUserExist) {
        throw new Error("User with this email already exists");
    }
     const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
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



const loginUser = async (payload : ILogInUser) => {
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where : {email},
        
    });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }


    const sendUser = await prisma.user.findUnique({
        where : {email},
        omit : {password: true}
    });



    




    return sendUser;
};






export const authService = {
    registerUserIntoDB,
    loginUser,

}