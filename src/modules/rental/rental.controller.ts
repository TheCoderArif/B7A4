import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status"
import { rentalService } from "./rental.service";

const createNewRentalOrder = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const payload = req.body;

    const result = await rentalService.createRentalOrderOnDB(payload)
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order submitted successfully",
        data: {result}
    });

});


export const rentalController = {
    createNewRentalOrder
};