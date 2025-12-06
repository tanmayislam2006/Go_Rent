import express, { Request, Response } from "express";
import initializeDb from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { userRoutes } from "./modules/users/users.routes";
const app = express();
app.use(express.json());
// TODO initializeDb
initializeDb();
app.get("/", (req: Request, res: Response) => {
  res.send("GO RENT SERVER IS WORKING");
});
// /api/v1
// !==> auth routes
app.use("/api/v1/auth", authRoutes);
// ! admin routes
// /api/v1/vehicles
app.use("/api/v1/vehicles", vehiclesRoutes);
app.use("/api/v1/users", userRoutes);
// ! customer routes
export default app;
