import express from "express";

import upload from "../middlewares/upload.js";
import {
  addMovie,
  createMovieFromOMDB,
  getMovieById,
  getMovies,
} from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.post("/add", upload.single("poster"), addMovie);

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/create-omdb", createMovieFromOMDB);

export default movieRouter;
