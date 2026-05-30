import express from "express";

import {
  getAdminProfile,
  getAllBookings,
  getDashboardData,
} from "../controllers/adminController.js";

import { isAdmin } from "../middlewares/authmiddleware.js";

const adminRouter = express.Router();

// DASHBOARD
adminRouter.get("/dashboard", isAdmin, getDashboardData);

// BOOKINGS
adminRouter.get("/bookings", isAdmin, getAllBookings);
adminRouter.get("/profile", getAdminProfile);

export default adminRouter;
