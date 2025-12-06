import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enum/role";

const router = Router();
router.get("/", vehiclesController.getAllVehicles);
router.get("/:vehicleId", vehiclesController.getASingleVehicle);
router.put("/:vehicleId", auth(Role.ADMIN), vehiclesController.updateVehicleData);
router.delete(
  "/:vehicleId",
  auth(Role.ADMIN),
  vehiclesController.deleteASingleVehicle
);
router.post("/", auth(Role.ADMIN), vehiclesController.createVehicleData);

export const vehiclesRoutes = router;
