import React, { useState } from "react";
import { Play } from "lucide-react";

const trailers = [
  {
    title: "Dhurandhar Trailer",
    thumbnail: "https://img.youtube.com/vi/NHk7scrb_9I/maxresdefault.jpg",

    video: "https://www.youtube.com/embed/NHk7scrb_9I",
  },
  {
    title: "Dhurandhar Official Trailer",

    thumbnail: "https://img.youtube.com/vi/BKOVzHcjEIo/maxresdefault.jpg",

    video: "https://www.youtube.com/embed/BKOVzHcjEIo",
  },
  {
    title: "Michael Official Trailer",

    thumbnail: "https://img.youtube.com/vi/3zOLzsbOleM/maxresdefault.jpg",

    video: "https://www.youtube.com/embed/3zOLzsbOleM",
  },
  {
    title: "Animal Trailer",
    thumbnail: "https://img.youtube.com/vi/Dydmpfo68DA/maxresdefault.jpg",

    video: "https://www.youtube.com/embed/Dydmpfo68DA",
  },

];

const TrailerSection = () => {
  const [activeTrailer, setActiveTrailer] = useState(trailers[0]);

  return (
    <section className="relative bg-[#0A0A0A] px-6 md:px-16 py-24 overflow-hidden">
      {/* Orange Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* Red Glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      <div className="relative z-10">
        {/* Heading */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Latest
            <span className="text-[#FF4D00]"> Trailers</span>
          </h2>

          {/* <div className="w-20 h-[4px] rounded-full bg-[#FF4D00]" /> */}
        </div>

        {/* Main Trailer */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,77,0,0.12)]">
          <iframe
            src={activeTrailer.video}
            title={activeTrailer.title}
            allowFullScreen
            className="w-full h-[250px] sm:h-[400px] md:h-[550px]"
          />
        </div>

        {/* Trailer List */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
          {trailers.map((trailer, index) => (
            <button
              key={index}
              onClick={() => setActiveTrailer(trailer)}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                activeTrailer.title === trailer.title
                  ? "border-[#FF4D00] scale-105"
                  : "border-white/10 hover:border-[#FF4D00]/40"
              }`}
            >
              {/* Thumbnail */}
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="w-full h-32 object-cover group-hover:scale-110 transition-all duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#E61919]/90 flex items-center justify-center shadow-[0_0_25px_rgba(230,25,25,0.6)] group-hover:scale-110 transition-all duration-300">
                  <Play size={24} fill="white" className="text-white ml-1" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-sm font-semibold line-clamp-1">
                  {trailer.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
