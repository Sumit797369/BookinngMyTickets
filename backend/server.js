import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.route.js";
import adminRouter from "./routers/admin.routes.js";
import movieRouter from "./routers/movie.route.js";
import bookingRouter from "./routers/booking.route.js";
import paymentRouter from "./routers/payment.route.js";
import showRouter from "./routers/show.route.js";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","https://bookinng-my-tickets.vercel.app/"],
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/movies/", movieRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/shows", showRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server started on port " + port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
