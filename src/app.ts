import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { authRoutes } from "./modules/auth/auth.route";
import { providerRoutes } from "./modules/provider/provider.route";
import { gearRoutes } from "./modules/gear/gear.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { rentalRoutes } from "./modules/rental/rental.route";
import { paymentRoutes } from "./modules/payment/payment.route";

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




app.use('/api/auth', authRoutes);

app.use('/api/provider', providerRoutes);

app.use('/api', gearRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api', rentalRoutes);

app.use('/api/payments', paymentRoutes);





export default app;