import React from "react";
import { Star } from "lucide-react";

const MovieCard = ({ movie }) => {
  return (
    <div className="group bg-[#151515] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FF4D00]/30 transition-all duration-500 hover:-translate-y-2">

      {/* Poster */}
      <div className="overflow-hidden">
        
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-[430px] object-cover group-hover:scale-110 transition-all duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-white text-2xl font-bold line-clamp-1">
          {movie.Title}
        </h3>

        <p className="text-gray-400 mt-3 text-sm">
          {movie.Year} • {movie.Genre}
        </p>

        <div className="flex items-center justify-between mt-6">

          <button className="px-5 py-3 rounded-2xl bg-[#FF4D00] hover:bg-[#ff5d1f] text-white font-semibold transition-all duration-300">
            Buy Tickets
          </button>

          <div className="flex items-center gap-2 text-[#FFCC00]">

            <Star
              size={20}
              fill="#FFCC00"
            />

            <span className="text-lg font-semibold">
              {movie.imdbRating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;