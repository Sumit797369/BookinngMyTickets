import express from "express";

import {
  getAllBookings,
  getDashboardData,
} from "../controllers/adminController.js";

import { isAdmin } from "../middlewares/authmiddleware.js";

const adminRouter = express.Router();

// DASHBOARD
adminRouter.get("/dashboard", isAdmin, getDashboardData);

// BOOKINGS
adminRouter.get("/bookings", isAdmin, getAllBookings);

export default adminRouter;
