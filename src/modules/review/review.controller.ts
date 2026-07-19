import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status"
import { reviewService } from "./revies.service";

const createReview = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const customerId = req.user?.id;

  const result = await reviewService.createReviewOnDB(customerId as string, req.body );

    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order submitted successfully",
        data: {result}
    });

});


export const reviewController = {
    createReview
};