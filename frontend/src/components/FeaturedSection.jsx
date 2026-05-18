import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCards";

// import MovieCard from "./MovieCard";

const API_KEY = "YOUR_API_KEY";

const FeaturedSection = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const fetchMovies = async () => {
      try {

        const movieNames = [
          "Jawan",
          "Animal",
          "Pathaan",
          "Pushpa",
          "KGF",
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
          responses.map((res) => res.data)
        );

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

        <button className="text-[#FF4D00] hover:text-[#ff6a2f] transition-all duration-300 font-semibold text-lg">
          View All →
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

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

export default FeaturedSection;