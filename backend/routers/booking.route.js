import express from "express";

import {
  bookTickets,
  getMyBookings,
} from "../controllers/bookingController.js";
import { isAuth } from "../middlewares/authmiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/create",
  isAuth,
  bookTickets,
);

bookingRouter.get(
  "/my-bookings",
  isAuth,
  getMyBookings,
);

export default bookingRouter;
