import React from "react";

import { Star, Clock3 } from "lucide-react";

import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group bg-[#151515] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FF4D00]/30 transition-all duration-500 hover:-translate-y-2 shadow-[0_0_25px_rgba(0,0,0,0.35)] block"
    >
      {/* POSTER */}
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-[430px] object-cover group-hover:scale-110 transition-all duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* GENRES */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {movie.genre?.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-xl text-white text-xs font-semibold border border-white/10"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-white text-2xl font-bold line-clamp-1">
          {movie.title}
        </h3>

        {/* INFO */}
        <div className="flex items-center gap-3 mt-3 text-gray-400 text-sm">
          <span>{movie.language}</span>

          <span>•</span>

          <div className="flex items-center gap-1">
            <Clock3 size={15} />

            <span>
              {movie.duration?.includes("min")
                ? `${Math.floor(parseInt(movie.duration) / 60)}h ${String(
                    parseInt(movie.duration) % 60,
                  ).padStart(2, "0")}m`
                : movie.duration}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm mt-4 line-clamp-2 leading-relaxed">
          {movie.description}
        </p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-6">
          {/* BUTTON */}
          <button className="px-5 py-3 rounded-2xl bg-[#FF4D00] hover:bg-[#ff5d1f] text-white font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(255,77,0,0.35)] hover:scale-105">
            Buy Tickets
          </button>

          {/* RATING */}
          <div className="flex items-center gap-2 text-[#FFCC00]">
            <Star size={20} fill="#FFCC00" />

            <span className="text-lg font-semibold">8.5</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
