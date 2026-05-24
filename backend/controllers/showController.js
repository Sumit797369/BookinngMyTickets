import { Show } from "../models/showModel.js";

export const createShow =
  async (req, res) => {
    try {

      const {
        movie,
        theater,
        date,
        screen,
        timings,
      } = req.body;

      const show =
        await Show.create({
          movie,

          theater,

          date,

          screen,

          timings,
        });

      return res
        .status(201)
        .json(show);

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getShows =
  async (req, res) => {
    try {

      const shows =
        await Show.find()
          .populate("movie")
          .sort({
            createdAt: -1,
          });

      return res
        .status(200)
        .json(shows);

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const deleteShow =
  async (req, res) => {
    try {

      await Show.findByIdAndDelete(
        req.params.id
      );

      return res
        .status(200)
        .json({
          success: true,
        });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  };