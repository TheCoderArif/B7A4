import { Router } from "express";
import { rentalController } from "./rental.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/rentals",auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER), rentalController.createNewRentalOrder);

router.get("/rentals",auth(Role.ADMIN, Role.PROVIDER), rentalController.getRentalOrders);

router.get("/rentals/:id", rentalController.getRentalOrderDetails);




export const rentalRoutes = router;