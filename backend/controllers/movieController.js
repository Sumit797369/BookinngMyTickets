import { Movie } from "../models/movieModel.js";


export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).json(movie);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMovies = async (req, res) => {
  try {

    const movies = await Movie.find();

    return res.status(200).json(movies);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
};