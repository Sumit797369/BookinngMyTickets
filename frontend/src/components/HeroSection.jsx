// components/HeroSection.jsx

import React from "react";
import { CalendarDays, Clock3, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

import dhurr from "../assets/dhurr.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">

      {/* Background Image */}
      <img
        src={dhurr}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-[2]" />

      {/* Orange Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4D00]/20 blur-[120px] rounded-full z-[2]" />

      {/* Red Glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/20 blur-[120px] rounded-full z-[2]" />

      {/* Content */}
      <div className="relative z-[50] h-full flex items-center px-6 md:px-16 lg:px-24">
        
        <div className="max-w-3xl">

          {/* Tag */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
            
            <div className="w-3 h-3 rounded-full bg-[#FF4D00]" />

            <span className="text-white font-medium tracking-wide">
              BLOCKBUSTER HIT
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight">
            Dhruandhar:
            <br />

            <span className="text-[#FF4D00]">
              The Revenge
            </span>
          </h1>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-300">
            
            <div className="flex items-center gap-2">
              <CalendarDays
                className="text-[#FFCC00]"
                size={22}
              />

              <span className="text-lg">
                2025
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3
                className="text-[#FFCC00]"
                size={22}
              />

              <span className="text-lg">
                3h 49m
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star
                className="text-[#FFCC00]"
                size={22}
                fill="#FFCC00"
              />

              <span className="text-lg">
                9.4/10
              </span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-3 mt-6">
            
            {[
              "Action",
              "Thriller",
              "Drama",
              "Adventure",
            ].map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm backdrop-blur-md"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed mt-8 max-w-2xl">
            Dhurandhar The Revenge introduces
            Jaskirat Singh Rangi, tracing the
            chain of events that compel him to
            become Hamza Ali Mazari, and follows
            his rise as he operates deep inside
            Pakistan.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-5 mt-10 relative z-[999]">

            {/* Book Tickets */}
            <Link
              to="/movies"
              className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-[#FF4D00] text-white font-bold text-lg transition-all duration-300 shadow-[0_0_35px_rgba(255,77,0,0.6)] hover:scale-105 hover:bg-[#ff5d1f] hover:shadow-[0_0_45px_rgba(255,77,0,0.8)] active:scale-95"
            >
              <span className="relative z-10">
                Book Tickets
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#E61919] opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Link>

            {/* Watch Trailer */}
            <a
              href="https://youtu.be/NHk7scrb_9I?si=Ct-MYLsfjZBqzFyP"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-[999] flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white font-semibold text-lg transition-all duration-300 hover:bg-white/5 hover:scale-105 hover:border-[#FF4D00]/40 hover:shadow-[0_0_30px_rgba(255,77,0,0.25)] active:scale-95 cursor-pointer"
             
            >
              
              <div className="w-10 h-10 rounded-full bg-[#E61919] flex items-center justify-center shadow-[0_0_20px_rgba(230,25,25,0.6)] group-hover:scale-110 transition-all duration-300">
                
                <Play
                  size={20}
                  fill="white"
                />
              </div>

              Watch Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[5]" />
    </section>
  );
};

export default HeroSection;