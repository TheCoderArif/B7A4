import cookieParser from "cookie-parser";
import express, { Application, Request, response, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";

const app : Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req : Request, res : Response) => {
    res.send("B7A4 Assignment!!")
})




app.use('/api/auth', userRoutes);





export default app;