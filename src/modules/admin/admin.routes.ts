import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enum/role";

const router =Router()
router.post('/',auth(Role.ADMIN),adminController.createVehicleData)
export const adminRoutes=router;