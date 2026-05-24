import express from "express";

import {
  getAllBookings,
  getDashboardData,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/dashboard", getDashboardData);
adminRouter.get("/bookings", getAllBookings);

export default adminRouter;
