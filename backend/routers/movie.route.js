import express from "express";

import upload from "../middlewares/upload.js";
import {
  addMovie,
  createMovieFromOMDB,
  getMovieById,
  getMovies,
} from "../controllers/movieController.js";
import { deleteMovie } from "../controllers/adminController.js";

const movieRouter = express.Router();

movieRouter.post("/add", upload.single("poster"), addMovie);

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.delete("/:id", deleteMovie);
movieRouter.post("/create-omdb", createMovieFromOMDB);

export default movieRouter;
