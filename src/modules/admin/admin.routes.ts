import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enum/role";

const router =Router()
router.get('/',adminController.getAllVehicles)
router.get('/:vehicleId',adminController.getASingleVehicle)
router.put('/:vehicleId',auth(Role.ADMIN),adminController.updateVehicleData)
router.delete('/:vehicleId',auth(Role.ADMIN),adminController.deleteASingleVehicle)
router.post('/',auth(Role.ADMIN),adminController.createVehicleData)
export const adminRoutes=router;