import React, { useEffect, useState } from "react";

import { CalendarDays, Clock3, Star, Play, Heart } from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import MovieCard from "../components/MovieCards";

import { serverUrl } from "../App";

const API_KEY = "fa568b78";

const MovieDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [relatedMovies, setRelatedMovies] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  const blockbusterMovies = [
    "Dhurandhar",
    "Dhurandhar The Revenge",
    "Michael",
    "Animal",
    "RRR",
  ];

  // FORMAT DURATION
  const formatDuration = (duration) => {
    if (typeof duration === "string" && duration.includes("min")) {
      const mins = parseInt(duration);

      const hrs = Math.floor(mins / 60);

      const remaining = mins % 60;

      return `${hrs}h ${remaining}m`;
    }

    return duration;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // DATABASE MOVIE
        try {
          const { data } = await axios.get(`${serverUrl}/api/movies/${id}`);

          setMovie(data);

          return;
        } catch {}

        // OMDB MOVIE
        const { data } = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
        );

        const normalizedMovie = {
          _id: data.imdbID,

          title: data.Title,

          poster: data.Poster,

          language: data.Language,

          duration: data.Runtime,

          genre: data.Genre ? data.Genre.split(",") : [],

          description: data.Plot,

          year: data.Year,

          rating: data.imdbRating,

          actors: data.Actors,
        };

        setMovie(normalizedMovie);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRelatedMovies = async () => {
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
          axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`),
        );

        const responses = await Promise.all(requests);

        const normalizedMovies = responses.map((res) => ({
          _id: res.data.imdbID,

          title: res.data.Title,

          poster: res.data.Poster,

          language: res.data.Language,

          duration: res.data.Runtime,

          genre: res.data.Genre?.split(",") || [],

          description: res.data.Plot,
        }));

        setRelatedMovies(normalizedMovies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();

    fetchRelatedMovies();
  }, [id]);

  // FAVORITES
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find((item) => item._id === movie?._id);

    setIsFavorite(!!exists);
  }, [movie]);

  // FAVORITE BUTTON
  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find((item) => item._id === movie._id);

    if (exists) {
      favorites = favorites.filter((item) => item._id !== movie._id);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      setIsFavorite(false);

      toast.success("Removed from favorites");
    } else {
      favorites.push(movie);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      setIsFavorite(true);

      toast.success("Added to favorites ❤️");
    }
  };

  // BOOK
  const handleBookTickets = () => {
    if (!selectedDate) {
      toast.error("Please choose the date");

      return;
    }

    navigate(`/movie/${movie._id}/shows/${selectedDate}`);
  };

  // DYNAMIC DATES
  const dates = Array.from({ length: 5 }, (_, index) => {
    const date = new Date();

    date.setDate(date.getDate() + index);

    return date.toISOString().split("T")[0];
  });

  // LOADING
  if (!movie) {
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
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover opacity-20 blur-sm"
        />

        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-16 py-20">
        {/* TOP */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* POSTER */}
          <div className="flex justify-center">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full max-w-md rounded-3xl shadow-[0_0_40px_rgba(255,77,0,0.25)] border border-[#FF4D00]/20"
            />
          </div>

          {/* DETAILS */}
          <div>
            {/* BLOCKBUSTER */}
            {blockbusterMovies.includes(movie.title) && (
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FF4D00]" />

                <span className="text-white font-medium tracking-wide">
                  BLOCKBUSTER HIT
                </span>
              </div>
            )}

            {/* TITLE */}
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              {movie.title}
            </h1>

            {/* INFO */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-300">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-[#FFCC00]" size={22} />

                <span className="text-lg">{movie.year || "2025"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="text-[#FFCC00]" size={22} />

                <span className="text-lg">
                  {formatDuration(movie.duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="text-[#FFCC00]" size={22} fill="#FFCC00" />

                <span className="text-lg">
                  {movie.rating || "8.5"}
                  /10
                </span>
              </div>
            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-3 mt-6">
              {movie.genre?.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-lg leading-relaxed mt-8">
              {movie.description}
            </p>

            {/* CAST */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-white mb-5">Star Cast</h3>

              <div className="flex flex-wrap gap-4">
                {(movie.actors?.split(",") || ["Actor 1", "Actor 2"]).map(
                  (actor, index) => (
                    <div
                      key={index}
                      className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white"
                    >
                      {actor}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-5 mt-10">
              {/* TRAILER */}
              <a
                href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[64px] px-8 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl text-white font-semibold text-lg hover:bg-black transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#E61919] flex items-center justify-center">
                  <Play size={20} fill="white" />
                </div>
                Watch Trailer
              </a>

              {/* BOOK */}
              <button
                onClick={handleBookTickets}
                className="h-[64px] px-8 rounded-2xl bg-[#FF4D00] text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-[#ff5d1f] flex items-center justify-center shadow-[0_0_25px_rgba(255,77,0,0.35)]"
              >
                Book Tickets
              </button>

              {/* FAVORITE */}
              <button
                onClick={handleFavorite}
                className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                  isFavorite
                    ? "bg-green-500 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.45)]"
                    : "bg-white/5 border-white/10 hover:border-green-500/40"
                }`}
              >
                <Heart
                  size={28}
                  fill={isFavorite ? "white" : "transparent"}
                  className="text-white"
                />
              </button>
            </div>

           
            {/* DATES */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-white mb-5">
                Choose Date
              </h3>

              <div className="flex flex-wrap gap-4">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-6 py-3 rounded-2xl border transition-all duration-300 ${
                      selectedDate === date
                        ? "bg-[#FF4D00] border-[#FF4D00] text-white"
                        : "bg-white/10 border-white/10 text-white hover:border-[#FF4D00]/40"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-28">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-white">
              You May Also Like
            </h2>

            <Link
              to="/movies"
              className="text-[#FF4D00] hover:text-[#ff6a2f] transition-all duration-300 font-semibold text-lg"
            >
              Show More →
            </Link>
          </div>

          {/* MOVIES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
