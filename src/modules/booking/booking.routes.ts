import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from './../../middleware/auth';
import { Role } from "../../enum/role";

const router =Router()
router.post('/',auth(Role.ADMIN,Role.CUSTOMER),bookingController.createBooking)
router.put('/:bookingId',auth(Role.ADMIN,Role.CUSTOMER),bookingController.updateBooking)
export const bookingRouter =router