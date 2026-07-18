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




const getSingleGear = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const gearId = req.params.id;

    const result = await gearService.getSingleGearFromDB(gearId as string);
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear details retrived successfully",
        data: {result}
    });

});



const getAllCategories = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const result = await gearService.getAllCategoriesFromDB();
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories retrived successfully",
        data: {result}
    });

});






export const gearController = {
    getAllGears,
    getSingleGear,
    getAllCategories
};