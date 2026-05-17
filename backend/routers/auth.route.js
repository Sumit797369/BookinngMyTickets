import express from "express";
import {
  googleAuth,
  logOut,
  register,
  login,
  getMe,
  updateProfile,
  updateAvatar,
} from "../controllers/auth.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.put("/update-avatar", upload.single("avatar"), updateAvatar);

authRouter.put("/update-profile", updateProfile);
authRouter.get("/me", getMe);

export default authRouter;
