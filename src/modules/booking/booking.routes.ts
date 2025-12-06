import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from './../../middleware/auth';
import { Role } from "../../enum/role";

const router =Router()
router.post('/',auth(Role.ADMIN,Role.CUSTOMER),bookingController.createBooking)
export const bookingRouter =router