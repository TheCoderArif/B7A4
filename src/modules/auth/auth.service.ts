import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ILogInUser } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../jwt";

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

    const jwtPayload = {
        id : user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessTokenSecret = config.jwt_access_token_secret ;
    const refreshTokenSecret = config.jwt_refresh_token_secret ;
    const accessTokenExpiry = config.jwt_access_expires_in ;
    const refreshTokenExpiry = config.jwt_refresh_expires_in ;

    const accessToken = jwtUtils.createToken(jwtPayload, accessTokenSecret, accessTokenExpiry);

    const refreshToken = jwtUtils.createToken(jwtPayload, refreshTokenSecret, refreshTokenExpiry);




    return {
        accessToken,
        refreshToken
    };
};






export const authService = {
    registerUserIntoDB,
    loginUser,

}