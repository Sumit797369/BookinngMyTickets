import { Movie } from "../models/movieModel.js";


export const addMovie = async (
  req,
  res
) => {
  try {

    const {
      title,
      description,
      language,
      duration,
      genre,
    } = req.body;

    const poster = req.file
      ? `${req.protocol}://${req.get(
          "host"
        )}/uploads/${req.file.filename}`
      : "";

    const movie = await Movie.create({
      title,
      description,
      poster,
      language,
      duration,

      genre: JSON.parse(genre),
    });

    return res.status(201).json(movie);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
};

export const getMovieById =
  async (req, res) => {
    try {

      const movie =
        await Movie.findById(
          req.params.id
        );

      if (!movie) {
        return res.status(404).json({
          message:
            "Movie not found",
        });
      }

      return res
        .status(200)
        .json(movie);

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