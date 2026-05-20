import React, { useEffect, useState } from "react";
import { CalendarDays, Clock3, Star, Play } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCards";

const API_KEY = "fa568b78";

const MovieDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [relatedMovies, setRelatedMovies] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  const blockbusterMovies = [
    "Dhurandhar",
    "Dhurandhar The Revenge",
    "Michael",
    "Animal",
    "RRR",
  ];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
        );

        setMovie(data);
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

        setRelatedMovies(responses.map((res) => res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();

    fetchRelatedMovies();
  }, [id]);

  const handleBookTickets = () => {
    if (!selectedDate) {
      toast.error("Please choose the date");
      return;
    }

    navigate(`/movie/${movie.imdbID}/shows/${selectedDate}`);
  };

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
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover opacity-20 blur-sm"
        />

        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Orange Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 py-20">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full max-w-md rounded-3xl shadow-[0_0_40px_rgba(255,77,0,0.25)] border border-[#FF4D00]/20"
            />
          </div>

          {/* Details */}
          <div>
            {/* Tag */}
            {/* Blockbuster Tag */}
            {blockbusterMovies.includes(movie.Title) && (
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FF4D00]" />

                <span className="text-white font-medium tracking-wide">
                  BLOCKBUSTER HIT
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              {movie.Title}
            </h1>

            {/* Info */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-300">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-[#FFCC00]" size={22} />

                <span className="text-lg">{movie.Year}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="text-[#FFCC00]" size={22} />

                <span className="text-lg">{movie.Runtime}</span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="text-[#FFCC00]" size={22} fill="#FFCC00" />

                <span className="text-lg">{movie.imdbRating}/10</span>
              </div>
            </div>

            {/* Genre */}
            <div className="flex flex-wrap gap-3 mt-6">
              {movie.Genre?.split(",").map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Plot */}
            <p className="text-gray-300 text-lg leading-relaxed mt-8">
              {movie.Plot}
            </p>

            {/* Cast */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-white mb-5">Star Cast</h3>

              <div className="flex flex-wrap gap-4">
                {movie.Actors?.split(",").map((actor, index) => (
                  <div
                    key={index}
                    className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white"
                  >
                    {actor}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-5 mt-10">
              {/* Trailer */}
              <a
                href={`https://www.youtube.com/results?search_query=${movie.Title}+trailer`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[64px] px-8 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl text-white font-semibold text-lg hover:bg-black transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#E61919] flex items-center justify-center">
                  <Play size={20} fill="white" />
                </div>
                Watch Trailer
              </a>

              {/* Book Ticket */}
              <button
                onClick={handleBookTickets}
                className="h-[64px] px-8 rounded-2xl bg-[#FF4D00] text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-[#ff5d1f] flex items-center justify-center shadow-[0_0_25px_rgba(255,77,0,0.35)]"
              >
                Book Tickets
              </button>
            </div>
            {/* Date Picker */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-white mb-5">
                Choose Date
              </h3>

              <div className="flex flex-wrap gap-4">
                {["2026-05-18", "2026-05-19", "2026-05-20", "2026-05-21"].map(
                  (date) => (
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
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
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

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedMovies.slice(0, 4).map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
