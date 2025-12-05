
import { Router } from "express";
import { authController } from "./auth.controller";

// /api/v1/auth/signup
// /api/v1/auth/signin
const router = Router();
router.post("/signup",authController.signUpUser)
router.post("/signin",authController.signInUser)
export const authRoutes = router;
