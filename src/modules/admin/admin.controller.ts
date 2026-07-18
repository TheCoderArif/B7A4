import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status"
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const result = await adminService.getAllUsersFromDB();
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users retrived successfully",
        data: {result}
    });

});


const updateUserStatus = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const { id } = req.params;
    const { status } = req.body;

    const result = await adminService.updateUserStatusOnDB(id as string, status );

   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: {result}
    });

});


const getAllGearsForAdmin = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const result = await adminService.getAllGearsForAdminFromDB();
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gears retrived successfully",
        data: {result}
    });

});





export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllGearsForAdmin
};