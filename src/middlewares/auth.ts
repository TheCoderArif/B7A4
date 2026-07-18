import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import catchAsync from "../utilities/catchAsync";
import { jwtUtils } from "../utilities/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import sendResponse from "../utilities/sendResponse";
import httpStatus from "http-status";
import { prisma } from "../lib/prisma";



const auth = (...requiredRoles : Role[]) => {
    return catchAsync(async (req : Request, res : Response, next : NextFunction) => {

        const accessToken = req.cookies.accessToken ? 
            req.cookies.accessToken 
            : 
            req.headers.authorization?.startsWith("Bearer") ? 
                req.headers.authorization?.split(" ")[1] 
                : 
                req.headers.authorization;


        //  || req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;

        if(!accessToken) {
            throw new Error(`This action is allowed for ${requiredRoles}`);
        }

        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_token_secret);

        if(!verifiedToken.success){
            throw new Error(verifiedToken.error);
        }

        const {id, name, email, role} = verifiedToken.data as JwtPayload;

         if (requiredRoles.length && !requiredRoles.includes(role)){
            return sendResponse(res,{
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "You don't have permission to access this resource",
                data: {}
            });
        };

        const user = await prisma.user.findUnique({
            where : {id, name, email, role}
        });

        if (!user){
            throw new Error("User not found. Please log in again.")
        }

        req.user = {id, name, email, role}



        next();



    });
};


export default auth;