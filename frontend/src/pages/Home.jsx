import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import MovieCard from "../components/MovieCards";
import FeaturedSection from "../components/FeaturedSection";
import TrailerSection from "../components/TrailerSection";
import Footer from "../components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center z-[999999] overflow-hidden">

        {/* Orange Glow */}
        <div className="absolute w-[300px] h-[300px] bg-[#FF4D00]/20 blur-[120px] rounded-full" />

        {/* Red Glow */}
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#E61919]/20 blur-[120px] rounded-full" />

        {/* Logo */}
        <div className="relative z-10 flex items-center animate-pulse">

          <img
            src="/bmt3.png"
            alt="logo"
            className="w-16 h-16 object-contain"
          />

          <h1 className="text-[#FF4D00] text-4xl md:text-5xl font-black italic">
            ookMyTickets
          </h1>
        </div>

        {/* Loader */}
        <div className="relative z-10 mt-10 flex gap-3">

          <div className="w-4 h-4 rounded-full bg-[#FF4D00] animate-bounce" />

          <div className="w-4 h-4 rounded-full bg-[#E61919] animate-bounce delay-150" />

          <div className="w-4 h-4 rounded-full bg-[#FFCC00] animate-bounce delay-300" />
        </div>

        {/* Text */}
        <p className="relative z-10 text-gray-400 mt-8 text-lg tracking-wide">
          Loading cinematic experience...
        </p>
      </div>
    );
  }


  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <TrailerSection />
    </>
  );
};

export default Home;
