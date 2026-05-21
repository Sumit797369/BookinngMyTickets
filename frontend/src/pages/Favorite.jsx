import React, { useEffect, useState } from "react";

import MovieCard from "../components/MovieCards";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      setFavorites(storedFavorites);

      setLoading(false);
    }, 1400);
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
    <section className="min-h-screen bg-[#0A0A0A] px-6 md:px-16 py-24">
      {/* Heading */}
      <div className="mb-14">
        <h1 className="text-5xl md:text-6xl font-black text-white">
          Favorite
          <span className="text-[#FF4D00]"> Movies</span>
        </h1>

        <p className="text-gray-400 text-lg mt-4">
          Your saved blockbuster collection.
        </p>
      </div>

      {/* Empty */}
      {favorites.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <h2 className="text-3xl text-gray-500 font-semibold">
            No favorite movies yet ❤️
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favorites.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorite;
