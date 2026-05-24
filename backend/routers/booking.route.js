import express from "express";

import {
  bookTickets,
  getBookedSeats,
  getMyBookings,
} from "../controllers/bookingController.js";
import { isAuth } from "../middlewares/authmiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/book", isAuth, bookTickets);
bookingRouter.get("/my-bookings", isAuth, getMyBookings);
bookingRouter.get("/booked-seats/:movieId", getBookedSeats);

export default bookingRouter;
