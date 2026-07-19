import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import { paymentService } from "./payment.service";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";

const createPaymentSession = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {

        const userId = req.user?.id;
         const rentalOrderId = req.body.id;

        //  console.log(req.body.id);

        const result = await paymentService.createPayment(userId as string, rentalOrderId as string);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Checkout completed successfully",
            data: {result}
        });

    }
);

const confirmPaynment = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {

        

    }
);


const getUsersPaymentHistory = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {

         const userId = req.user?.id;


    const result = await paymentService.getPaymentHistoryFromDB(userId as string); 

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment history retrived successfully",
        data: {result}
    });


    }
);

const getPaymentDetails = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {

        const paymentId = req.params.id;

        const result = await paymentService.getPaymentDetailsFromDB(paymentId as string);

        sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment Details retrived successfully",
        data: {result}
    });

    }
);



export const paymentController = {
    createPaymentSession, 
    confirmPaynment,
    getUsersPaymentHistory,
    getPaymentDetails
};