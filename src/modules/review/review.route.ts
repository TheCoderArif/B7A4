import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";

const router = Router();



router.post("/reviews",auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER), reviewController.createReview);


export const reviewRoutes = router;