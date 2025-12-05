import express, { Request, Response } from "express";
import initializeDb from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
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
// ! customer routes
// ! admin routes
export default app;
