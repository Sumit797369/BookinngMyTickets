// ChooseShow.jsx

import React, { useEffect, useState } from "react";

import { Clock3 } from "lucide-react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

const API_KEY = "fa568b78";

const ChooseShow = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const formatDuration = (duration) => {
    if (typeof duration === "string" && duration.includes("min")) {
      const mins = parseInt(duration);

      const hrs = Math.floor(mins / 60);

      const remaining = mins % 60;

      return `${hrs}h ${remaining}m`;
    }

    return duration;
  };

  // Selected Date
  const [selectedDate, setSelectedDate] = useState(0);

  const dates = [
    {
      day: "TUE",
      date: "19",
      month: "MAY",
    },

    {
      day: "WED",
      date: "20",
      month: "MAY",
    },

    {
      day: "THU",
      date: "21",
      month: "MAY",
    },

    {
      day: "FRI",
      date: "22",
      month: "MAY",
    },

    {
      day: "SAT",
      date: "23",
      month: "MAY",
    },
  ];

  const theaters = [
    {
      name: "PVR: MBD Mall, Jalandhar",

      timings: ["09:20 AM", "01:30 PM"],
    },

    {
      name: "INOX: Reliance Mall",

      timings: ["11:25 AM", "04:30 PM"],
    },

    {
      name: "Cinepolis: Viva Collage",

      timings: ["10:30 AM", "07:00 PM"],
    },
  ];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
        );

        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [id]);

  // Loading
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
    <section className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* Orange Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* Red Glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      <div className="relative z-10">
        {/* Movie Info */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black">{movie.Title}</h1>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            {/* Runtime */}
            <div className="flex items-center gap-2">
              <Clock3 className="text-[#FFCC00]" size={22} />

              <span className="text-lg">{formatDuration(movie.duration)}</span>
            </div>

            {/* Genre */}
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {movie.Genre}
            </div>

            {/* Language */}
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300">
              Hindi
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4 overflow-x-auto pb-4 py-4 mb-12">
          {dates.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`min-w-[100px] rounded-2xl px-5 py-4 border transition-all duration-300 ${
                selectedDate === index
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

        {/* Theaters */}
        <div className="space-y-8">
          {theaters.map((theater, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-[#FF4D00]/30 transition-all duration-300"
            >
              {/* Theater */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left */}
                <div>
                  <h2 className="text-2xl font-bold">{theater.name}</h2>

                  <p className="text-gray-400 mt-2">Cancellation Available</p>
                </div>

                {/* Timings */}
                <div className="flex flex-wrap gap-4">
                  {theater.timings.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        navigate(
                          `/movie/${movie.imdbID}/shows/${selectedDate}/${encodeURIComponent(time.trim())}`,
                          {
                            state: {
                              theater: theater.name,
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseShow;
