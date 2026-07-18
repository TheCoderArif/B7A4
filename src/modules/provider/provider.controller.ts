import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import { providerService } from "./provider.service";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { jwtUtils } from "../../utilities/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const addGear = catchAsync(async (req : Request, res : Response, next : NextFunction) => {

    const {accessToken} = req.cookies;
    
        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_token_secret) as JwtPayload;
    

    const payload = req.body;

    const gear = await providerService.addGearIntoDB(payload, verifiedToken.data.id);

    if (!gear){
        sendResponse(res,{
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to add gear",
            data: {}
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Gear added successfully",
        data: {gear}
    });

});



const updateGear = catchAsync(async (req : Request, res : Response, next: NextFunction) =>{

    const gearId = req.params.id;
    const payload = req.body;

    const {accessToken} = req.cookies;
    
        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_token_secret) as JwtPayload;
    


    // console.log(gearId);

    // const result = await providerService.updateGearIntoDB(gearId as string, payload, verifiedToken.data.id);

    console.log(gearId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear updated successfully",
        data: {}
    });

});


const deleteGear = catchAsync(async (req : Request, res : Response, next: NextFunction) =>{

    const gearId = req.params.id;

    // console.log(gearId);
    

    const result = providerService.deleteGearFromDB(gearId as string);




    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear deleted successfully",
        data: {}
    });

});



export const providerController = {
    addGear,
    updateGear,
    deleteGear
};