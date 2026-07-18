import { Router } from "express";
import { adminController } from "./admin.controller";


const router = Router();



router.get("/users", adminController.getAllUsers);

router.patch("/users/:id", adminController.updateUserStatus);

router.get("/gear", adminController.getAllGearsForAdmin);

// router.get("/rentals", );





export const adminRoutes = router;