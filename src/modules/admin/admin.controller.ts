import { Request, Response } from "express";
import { adminService } from "./admin.service";

const createVehicleData = async (req: Request, res: Response) => {
  try {
    const result = await adminService.createVehicleData(req.body);
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

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllVehicles();
    res.status(200).json({
      success: true,
      message: result.length
        ? "Vehicles retrieved successfully"
        : "No vehicles found",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
const getASingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await adminService.getASingleVehicle(vehicleId as string);
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
const updateVehicleData = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await adminService.updateVehicleData(
      vehicleId as string,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
const deleteASingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await adminService.deleteASingleVehicle(vehicleId as string);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};

export const adminController = {
  createVehicleData,
  getAllVehicles,
  getASingleVehicle,
  updateVehicleData,
  deleteASingleVehicle
};
