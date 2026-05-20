// pages/Movies.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCards";


const API_KEY = "fa568b78";

const Movies = () => {

  const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMovies = async () => {
      try {

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
          axios.get(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`
          )
        );

        const responses = await Promise.all(requests);

        setMovies(
          responses
            .map((res) => res.data)
            .filter((movie) => movie.Response !== "False")
        );

      } catch (error) {
        console.log(error);
      }finally {

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchMovies();

  }, []);
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

      {/* Orange Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* Red Glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      {/* Heading */}
      <div className="relative z-10 mb-14">

        <h1 className="text-5xl md:text-6xl font-black text-white">
          Explore
          <span className="text-[#FF4D00]">
            {" "}Movies
          </span>
        </h1>

        <p className="text-gray-400 text-lg mt-4 max-w-2xl">
          Discover the latest blockbuster Indian movies,
          trending action films, thrillers, and cinematic
          experiences.
        </p>
      </div>

      {/* Movies Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default Movies;