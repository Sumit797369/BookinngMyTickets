import React, { useState } from "react";

import axios from "axios";

import { serverUrl } from "../../App";
import toast from "react-hot-toast";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    poster: null,
    language: "",
    genre: "",
    hours: "",
    minutes: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // DURATION
      const duration = `${movieData.hours}h ${movieData.minutes}m`;

      formData.append("title", movieData.title);

      formData.append("description", movieData.description);

      formData.append("language", movieData.language);

      formData.append("duration", duration);

      formData.append(
        "genre",
        JSON.stringify(movieData.genre.split(",").map((g) => g.trim())),
      );

      formData.append("poster", movieData.poster);

      await axios.post(`${serverUrl}/api/movies/add`, formData, {
        withCredentials: true,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Movie Added Successfully");

      // RESET
      setMovieData({
        title: "",
        description: "",
        poster: null,
        language: "",
        genre: "",
        hours: "",
        minutes: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* TITLE */}
      <h1 className="text-4xl font-black mb-10">Add Movie</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* MOVIE TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movieData.title}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        {/* POSTER */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            id="posterUpload"
            hidden
            onChange={(e) =>
              setMovieData({
                ...movieData,
                poster: e.target.files[0],
              })
            }
          />

          <label
            htmlFor="posterUpload"
            className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 transition-all duration-300"
          >
            {/* LEFT */}
            <span className="font-semibold text-gray-300">Add Poster</span>

            {/* RIGHT */}
            <span className="text-sm text-gray-400 truncate max-w-[180px]">
              {movieData.poster ? movieData.poster.name : "No file selected"}
            </span>
          </label>
        </div>

        {/* LANGUAGE */}
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={movieData.language}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        {/* DURATION */}
        <div className="grid grid-cols-2 gap-4">
          {/* HOURS */}
          <select
            name="hours"
            value={movieData.hours}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
          >
            <option value="" className="bg-black">
              Hours
            </option>

            {[1, 2, 3, 4, 5].map((hr) => (
              <option key={hr} value={hr} className="bg-black">
                {hr} hr
              </option>
            ))}
          </select>

          {/* MINUTES */}
          <select
            name="minutes"
            value={movieData.minutes}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
          >
            <option value="" className="bg-black">
              Minutes
            </option>

            {Array.from({ length: 60 }, (_, i) => i).map((min) => (
              <option key={min} value={min} className="bg-black">
                {min} min
              </option>
            ))}
          </select>
        </div>

        {/* GENRES */}
        <input
          type="text"
          name="genre"
          placeholder="Genres (comma separated)"
          value={movieData.genre}
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Movie Description"
          value={movieData.description}
          onChange={handleChange}
          rows={6}
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="group relative overflow-hidden flex items-center justify-center gap-3 bg-[#FF4D00] px-6 py-4 rounded-2xl font-semibold shadow-[0_0_20px_rgba(255,77,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,77,0,0.55)] md:col-span-2"
        >
          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* SHINE */}
          <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 group-hover:left-[120%] transition-all duration-700" />

          {/* TEXT */}
          <div className="relative z-10">Add Movie</div>
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
