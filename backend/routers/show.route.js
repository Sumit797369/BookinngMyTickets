import express from "express";

import {
  createShow,
  getShows,
  deleteShow,
} from "../controllers/showController.js";

const showRouter = express.Router();

showRouter.post("/create", createShow);

showRouter.get("/", getShows);

showRouter.delete("/:id", deleteShow);

export default showRouter;
