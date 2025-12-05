import { Request, Response } from "express";
import { adminService } from "./admin.service";

const createVehicleData = async (req: Request, res: Response) => {
  try {
    const result =await adminService.createVehicleData(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
export const adminController = {
  createVehicleData,
};
