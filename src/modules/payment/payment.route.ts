import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post('/create',auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER), paymentController.createPaymentSession);

router.post('/confirm',auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER), paymentController.confirmPaynment);

router.get('/',auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER), paymentController.getUsersPaymentHistory);

router.get('/:id',auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER), paymentController.getPaymentDetails);






export const paymentRoutes = router;