import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { gearService } from "./gear.service";

const getAllGears = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const result = await gearService.getAllGearsFromDB();
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gears retrived successfully",
        data: {result}
    });

});


export const gearController = {
    getAllGears
};