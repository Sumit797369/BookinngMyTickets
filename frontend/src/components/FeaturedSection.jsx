import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCards";
import { Link } from "react-router-dom";

// import MovieCard from "./MovieCard";

const API_KEY = "fa568b78";

const FeaturedSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieNames = [
          "Dhurandhar",
          "Dhurandhar The Revenge",
          "Bhooth Bangla",
          "Michael",
        ];

        const requests = movieNames.map((movie) =>
          axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`),
        );

        const responses = await Promise.all(requests);

        setMovies(responses.map((res) => res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-16 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      {/* Header */}
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

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-14 relative z-10">
        <Link
          to="/movies"
          className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-[#FF4D00] text-white font-bold text-lg transition-all duration-300 shadow-[0_0_35px_rgba(255,77,0,0.5)] hover:scale-105 hover:shadow-[0_0_45px_rgba(255,77,0,0.7)] active:scale-95"
        >
          <span className="relative z-10">Show More</span>

          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#E61919] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
