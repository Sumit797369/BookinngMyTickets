import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routers/auth.route.js";
import adminRouter from "./routers/admin.routes.js";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/uploads", express.static("uploads"));

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server started on port " + port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
