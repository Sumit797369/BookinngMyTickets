import React, { useEffect, useState } from "react";

import axios from "axios";

import MovieCard from "./MovieCards";

import { Link } from "react-router-dom";

import { serverUrl } from "../App";

const API_KEY = "fa568b78";

const FeaturedSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

 const fetchMovies = async () => {
  try {

    // DATABASE MOVIES
    let dbMovies = [];

    try {

      const { data } =
        await axios.get(
          `${serverUrl}/api/movies`
        );

      dbMovies = data;

    } catch (error) {

      console.log(
        "DB Error",
        error
      );
    }

    // OMDB MOVIES
    const movieNames = [
      "Dhurandhar",
      "Animal",
      "Jawan",
      "RRR",
    ];

    const requests =
      movieNames.map((movie) =>
        axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`
        )
      );

    const responses =
      await Promise.allSettled(
        requests
      );

    const omdbMovies =
      responses
        .filter(
          (res) =>
            res.status ===
            "fulfilled"
        )
        .map(
          (res) =>
            res.value.data
        )
        .filter(
          (movie) =>
            movie.Response !==
            "False"
        )
        .map((movie) => ({
          _id: movie.imdbID,

          title: movie.Title,

          poster: movie.Poster,

          language:
            movie.Language,

          duration:
            movie.Runtime,

          genre: movie.Genre
            ? movie.Genre.split(
                ","
              )
            : [],

          description:
            movie.Plot,
        }));

    // COMBINE
    setMovies([
      ...dbMovies,
      ...omdbMovies,
    ].slice(0, 4));

  } catch (error) {

    console.log(error);

  }
};

  return (
    <section className="relative py-24 px-6 md:px-16 bg-[#0A0A0A] overflow-hidden">
      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-14 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Now Showing
        </h2>

        <Link
          to="/movies"
          className="text-[#FF4D00] hover:text-[#ff6a2f] transition-all duration-300 font-semibold text-lg"
        >
          View All →
        </Link>
      </div>

      {/* MOVIES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-14 relative z-10">
        <Link
          to="/movies"
          className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-[#FF4D00] text-white font-bold text-lg transition-all duration-300 shadow-[0_0_35px_rgba(255,77,0,0.5)] hover:scale-105 hover:shadow-[0_0_45px_rgba(255,77,0,0.7)] active:scale-95"
        >
          <span className="relative z-10">Show More</span>

          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#E61919] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
