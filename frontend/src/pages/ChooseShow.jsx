import React, { useEffect, useState } from "react";

import { Clock3 } from "lucide-react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { serverUrl } from "../App";

const API_KEY = "fa568b78";

const ChooseShow = () => {
  const { id, date } = useParams();

  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  const [shows, setShows] = useState([]);

  const [loading, setLoading] = useState(true);

  // SELECTED DATE
  const [selectedDate, setSelectedDate] = useState(
    date || new Date().toISOString().split("T")[0],
  );

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

  // DYNAMIC DATES
  const dates = Array.from({ length: 5 }, (_, index) => {
    const d = new Date();

    d.setDate(d.getDate() + index);

    return {
      fullDate: d.toISOString().split("T")[0],

      day: d
        .toLocaleDateString("en-US", {
          weekday: "short",
        })
        .toUpperCase(),

      date: d.getDate(),

      month: d
        .toLocaleDateString("en-US", {
          month: "short",
        })
        .toUpperCase(),
    };
  });

  // FETCH MOVIE
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // DATABASE MOVIE
        const { data } = await axios.get(`${serverUrl}/api/movies/${id}`);

        const normalizedMovie = {
          _id: data._id,

          title: data.title,

          poster: data.poster,

          language: data.language,

          duration: data.duration,

          genre: data.genre || [],

          description: data.description,
        };

        setMovie(normalizedMovie);
      } catch {
        try {
          // OMDB MOVIE
          const { data } = await axios.get(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
          );

          const normalizedMovie = {
            _id: data.imdbID,

            title: data.Title,

            poster: data.Poster,

            language: data.Language,

            duration: data.Runtime,

            genre: data.Genre ? data.Genre.split(",") : [],

            description: data.Plot,
          };

          setMovie(normalizedMovie);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchMovie();
  }, [id]);

  // FETCH SHOWS
  const fetchShows = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/shows`);

      // FILTER SHOWS
      const filteredShows = data.filter(
        (show) =>
          show?.movie?._id?.toString() === id?.toString() &&
          show?.date === selectedDate,
      );
      setShows(filteredShows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH WHEN DATE CHANGES
  useEffect(() => {
    if (id && selectedDate) {
      fetchShows();
    }
  }, [id, selectedDate]);

  // LOADING
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
    <section className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* ORANGE GLOW */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* RED GLOW */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      <div className="relative z-10">
        {/* MOVIE INFO */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black">{movie?.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            {/* RUNTIME */}
            <div className="flex items-center gap-2">
              <Clock3 className="text-[#FFCC00]" size={22} />

              <span className="text-lg">
                {formatDuration(movie?.duration || movie?.Runtime)}
              </span>
            </div>

            {/* GENRE */}
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {movie?.genre?.join(", ")}
            </div>

            {/* LANGUAGE */}
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {movie?.language}
            </div>
          </div>
        </div>

        {/* DATES */}
        <div className="flex gap-4 overflow-x-auto pb-4 py-4 mb-12">
          {dates.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDate(item.fullDate);

                navigate(`/movie/${id}/shows/${item.fullDate}`);
              }}
              className={`min-w-[100px] rounded-2xl px-5 py-4 border transition-all duration-300 ${
                selectedDate === item.fullDate
                  ? "bg-[#FF4D00] border-[#FF4D00] text-white shadow-[0_0_30px_rgba(255,77,0,0.4)] scale-105"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-[#FF4D00]/40 hover:bg-white/10"
              }`}
            >
              <p className="text-sm font-medium">{item.day}</p>

              <h2 className="text-3xl font-black mt-1">{item.date}</h2>

              <p className="text-sm mt-1">{item.month}</p>
            </button>
          ))}
        </div>

        {/* SHOWS */}
        <div className="space-y-8">
          {shows.length === 0 ? (
            <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/[0.03]">
              <h2 className="text-3xl font-black">No Shows Available</h2>

              <p className="text-gray-400 mt-4">
                No shows found for this date.
              </p>
            </div>
          ) : (
            shows.map((show, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-[#FF4D00]/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  {/* LEFT */}
                  <div>
                    <h2 className="text-2xl font-bold">{show.theater}</h2>

                    <p className="text-gray-400 mt-2">Cancellation Available</p>
                  </div>

                  {/* TIMINGS */}
                  <div className="flex flex-wrap gap-4">
                    {show.timings.map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          navigate(
                            `/movie/${movie?._id}/shows/${selectedDate}/${encodeURIComponent(time.trim())}`,
                            {
                              state: {
                                theater: show.theater,

                                movie,
                              },
                            },
                          )
                        }
                        className="px-8 py-4 rounded-2xl border border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ChooseShow;
