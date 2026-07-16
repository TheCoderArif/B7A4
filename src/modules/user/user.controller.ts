import { Request, Response } from "express";
import httpStatus from "http-status"
import { userService } from "./user.service";

const registerUser = async (req : Request, res: Response) => {

    const user = await userService.registerUserIntoDB(req.body);
   

    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message : "user registered successfully",
        data : {
            user
        }
    });
};


export const userController = {
    registerUser,

}

