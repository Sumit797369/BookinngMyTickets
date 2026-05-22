import express from "express";

import upload from "../middlewares/upload.js";
import { addMovie, getMovies } from "../controllers/movieController.js";

const movieRouter = express.Router();

router.post(
  "/add",
  upload.single("poster"),
  addMovie
);

movieRouter.get("/", getMovies);

export default movieRouter;