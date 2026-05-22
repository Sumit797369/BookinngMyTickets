import express from "express";

import {
  getDashboardData,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get(
  "/dashboard",
  getDashboardData
);

export default adminRouter;