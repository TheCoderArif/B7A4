import { Router } from "express";
import { providerController } from "./provider.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/gear",auth(Role.PROVIDER), providerController.addGear);

router.put("/gear/:id",auth(Role.PROVIDER), providerController.updateGear);

router.delete("/gear/:id",auth(Role.PROVIDER), providerController.deleteGear);

router.get("/orders",auth(Role.PROVIDER), providerController.getIncomingRentalOrders);

router.patch("/orders/:id",auth(Role.PROVIDER), providerController.updateRentalOrderStatus);





export const providerRoutes = router;