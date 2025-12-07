import { Request, Response } from "express";
import { userServices } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: result.length
        ? "Users retrieved successfully"
        : "No users found",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userInfoInToken =req.user
    const result = await userServices.updateUser(userInfoInToken as Record<string,any>,userId as string, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result =await userServices.deleteUser(userId as string)
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
export const userController = {
  getAllUsers,
  updateUser,
  deleteUser
};
