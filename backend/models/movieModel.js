import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    poster: String,

    banner: String,

    genre: [String],

    duration: String,

    language: String,

    releaseDate: Date,

    trailer: String,

    cast: [String],
  },
  {
    timestamps: true,
  }
);

export const Movie =
  mongoose.model("Movie", movieSchema);