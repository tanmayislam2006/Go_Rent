import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const getBookings = async (req: Request, res: Response) => {
  const userInfoInToken = req.user;
  try {
    const result = await bookingService.getBookings(
      userInfoInToken as Record<string, any>
    );
    res.status(200).json({ ...result });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);
    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
const updateBooking = async (req: Request, res: Response) => {
  const userIdInToken = req.user?.id;
  const { bookingId } = req.params;
  try {
    const result = await bookingService.updateBooking(
      bookingId as string,
      req.body,
      userIdInToken
    );
    res.status(200).json({
      success: true,
      message: "Booking update successfully",
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};
export const bookingController = {
  createBooking,
  updateBooking,
  getBookings,
};
