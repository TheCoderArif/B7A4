import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status"

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

    const loginResult = await authService.loginUser(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: loginResult
    });

});





export const authController = {
    registerUser,
    loginUser
};