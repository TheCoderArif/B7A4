import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utilities/jwt";

const registerUser = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const payload = req.body;
    const user = await authService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {user}
    });

});




const loginUser = catchAsync(async (req : Request, res : Response, next : NextFunction ) => {

    const payload = req.body;

    const {accessToken, refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 24 hours or 1 day
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 day
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: {accessToken, refreshToken}
    });

});





const getMyProfile = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    


    const {accessToken} = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_token_secret) as JwtPayload;

    // console.log(verifiedToken.data.id);

    const user = await authService.getMyProfileFromDB(verifiedToken.data.id);


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User data fetched successfully!",
        data: {user}
    });


    


    
});





export const authController = {
    registerUser,
    loginUser,
    getMyProfile
};