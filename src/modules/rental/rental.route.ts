import { Router } from "express";
import { rentalController } from "./rental.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/rentals",auth(Role.CUSTOMER), rentalController.createNewRentalOrder);

// router.get("/rentals");

// router.get("/rentals/:id");




export const rentalRoutes = router;