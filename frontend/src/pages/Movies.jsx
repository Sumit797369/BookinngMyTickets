import React, { useEffect, useState } from "react";

import axios from "axios";
import MovieCard from "../components/MovieCards";
import { serverUrl } from "../App";

const API_KEY = "fa568b78";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // DATABASE MOVIES
      const dbResponse = await axios.get(`${serverUrl}/api/movies`);

      const dbMovies = dbResponse.data;

      // OMDB MOVIES
      const movieNames = [
        "Dhurandhar",
        "Dhurandhar The Revenge",
        "Bhooth Bangla",
        "Michael",
        "Drishyam 3",
        "Mortal Kombat II",
        "The Devil Wears Prada 2",
        "Jawan",
        "Animal",
        "Pathaan",
        "RRR",
        "Leo",
        "Salaar",
      ];

      const requests = movieNames.map((movie) =>
        axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`),
      );

      const responses = await Promise.allSettled(requests);
      const omdbMovies = responses
        .filter((res) => res.status === "fulfilled")
        .map((res) => res.value.data)

        // YE ADD KAR
        .filter((movie) => movie.Response !== "False")
        .map((movie) => ({
          _id: movie.imdbID,

          title: movie.Title,

          poster: movie.Poster,

          language: movie.Language,

          duration: movie.Runtime,

          genre: movie.Genre ? movie.Genre.split(",") : [],

          description: movie.Plot,
        }));

      const mergedMovies = [...dbMovies, ...omdbMovies];

      // REMOVE DUPLICATES
      // REMOVE DUPLICATES
      const uniqueMovies = mergedMovies.filter(
        (movie, index, self) =>
          index ===
          self.findIndex(
            (m) =>
              (m.title || m.Title)?.toLowerCase() ===
              (movie.title || movie.Title)?.toLowerCase(),
          ),
      );

      setMovies(uniqueMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-[#FF4D00] animate-bounce" />

          <div className="w-5 h-5 rounded-full bg-[#E61919] animate-bounce delay-150" />

          <div className="w-5 h-5 rounded-full bg-[#FFCC00] animate-bounce delay-300" />
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] px-6 md:px-16 py-20 overflow-hidden">
      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      {/* HEADING */}
      <div className="relative z-10 mb-14">
        <h1 className="text-5xl md:text-6xl font-black text-white">
          Explore
          <span className="text-[#FF4D00]"> Movies</span>
        </h1>

        <p className="text-gray-400 text-lg mt-4 max-w-2xl">
          Discover the latest blockbuster movies and cinematic experiences.
        </p>
      </div>

      {/* MOVIES */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
