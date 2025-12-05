import { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async (req: Request, res: Response) => {
  const userInfo = req.body;
  if (userInfo.password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }
  try {
    const result = await authService.signUpUser(userInfo);

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data: { ...result },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or Password Missing",
    });
  }
  try {
    const result = await authService.signInUser(email, password);
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signUpUser,
  signInUser,
};
