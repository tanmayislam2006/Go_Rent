import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enum/role";
const router = Router();
router.get("/", auth(Role.ADMIN), userController.getAllUsers);
router.put("/:userId", auth(Role.ADMIN), userController.updateUser);
router.delete("/:userId", auth(Role.ADMIN), userController.deleteUser);
export const userRoutes = router;
