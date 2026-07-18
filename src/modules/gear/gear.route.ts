import { Router } from "express";
import { gearController } from "./gear.controller";

const router = Router();



router.get("/gear",gearController.getAllGears);

// router.get("/gear/:id",);

// router.get("/categories",);







export const gearRoutes = router;