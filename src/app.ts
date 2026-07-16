import cookieParser from "cookie-parser";
import express, { Application, Request, response, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

const app : Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req : Request, res : Response) => {
    res.send("Hello World! B7A4")
})

app.post("/api/auth/register", async (req : Request, res: Response) => {
    const {name, email, password} = req.body;

    

    const isUserExist = await prisma.user.findUnique(
        {where : {email}}
    );
    if (isUserExist) {
        throw new Error("User with this email already exists");
    }

     const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data : {
            name,
            email,
            password: hashPassword,

        },
        omit : {
            password: true
        }
    });

    // console.log(name, email, password);
    // console.log( "password",hashPassword);

    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message : "user registered successfully",
        data : {
            user
        }
    });
} );

export default app;