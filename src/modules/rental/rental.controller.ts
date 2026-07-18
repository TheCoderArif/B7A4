import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status"
import { rentalService } from "./rental.service";
import { jwtUtils } from "../../utilities/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const createNewRentalOrder = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

     const {accessToken} = req.cookies;
    
        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_token_secret) as JwtPayload;

        const customerId = verifiedToken.data.id;
    

    const payload = req.body;

    const result = await rentalService.createRentalOrderOnDB(payload, customerId);
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order submitted successfully",
        data: {result}
    });

});


const getRentalOrders = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    

    const result = await rentalService.getRentalOrdersFromDB();
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental orders fetched successfully",
        data: {result}
    });

});




const getRentalOrderDetails = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const rentalOrderId = req.params.id;

    const result = await rentalService.getRentalOrderDetailsFromDB(rentalOrderId as string);
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order details fetched successfully",
        data: {result}
    });

});





export const rentalController = {
    createNewRentalOrder,
    getRentalOrders,
    getRentalOrderDetails
};
