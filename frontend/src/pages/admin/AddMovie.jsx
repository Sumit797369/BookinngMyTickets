import React, { useState } from "react";

import axios from "axios";

import { serverUrl } from "../../App";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    poster: "",
    language: "",
    duration: "",
    genre: "",
  });

  const formData = new FormData();

  formData.append("poster", movieData.poster);

  const handleChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...movieData,

        genre: movieData.genre.split(",").map((g) => g.trim()),
      };

      await axios.post(`${serverUrl}/api/movies/add`, payload, {
        withCredentials: true,
      });

      alert("Movie Added");

      setMovieData({
        title: "",
        description: "",
        poster: "",
        language: "",
        duration: "",
        genre: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-4xl font-black mb-10">Add Movie</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movieData.title}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          name="poster"
          placeholder="Poster URL"
          value={movieData.poster}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          name="language"
          placeholder="Language"
          value={movieData.language}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={movieData.duration}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          name="genre"
          placeholder="Genres (comma separated)"
          value={movieData.genre}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
        />

        <textarea
          name="description"
          placeholder="Movie Description"
          value={movieData.description}
          onChange={handleChange}
          rows={6}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
        />

        <button className="group relative overflow-hidden flex items-center gap-3 bg-[#FF4D00] px-6 py-3 rounded-2xl font-semibold shadow-[0_0_20px_rgba(255,77,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,77,0,0.55)] md:col-span-2">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Shine Effect */}
          <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 group-hover:left-[120%] transition-all duration-700" />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-3">Add Movie</div>
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
