// pages/admin/ManageShows.jsx

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  CalendarDays,
  Clock3,
  Film,
  Plus,
  Trash2,
  MapPin,
} from "lucide-react";

import { serverUrl } from "../../App";

const ManageShows = () => {

  const [movies, setMovies] =
    useState([]);

  const [shows, setShows] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showData, setShowData] =
    useState({
      movie: "",

      theater: "",

      date: "",

      screen: "",

      timings: "",
    });

  // FETCH
  useEffect(() => {

    fetchMovies();

    fetchShows();

  }, []);

  // MOVIES
  const fetchMovies =
    async () => {
      try {

        const { data } =
          await axios.get(
            `${serverUrl}/api/movies`
          );

        setMovies(data);

      } catch (error) {

        console.log(error);

      }
    };

  // SHOWS
  const fetchShows =
    async () => {
      try {

        const { data } =
          await axios.get(
            `${serverUrl}/api/shows`
          );

        setShows(data);

      } catch (error) {

        console.log(error);

      } finally {

        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setShowData({
      ...showData,

      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE SHOW
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        await axios.post(
          `${serverUrl}/api/shows/create`,
          {
            ...showData,

            timings:
              showData.timings
                .split(",")
                .map((t) =>
                  t.trim()
                ),
          },
          {
            withCredentials: true,
          }
        );

        fetchShows();

        setShowData({
          movie: "",

          theater: "",

          date: "",

          screen: "",

          timings: "",
        });

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE
  const deleteShow =
    async (id) => {
      try {

        await axios.delete(
          `${serverUrl}/api/shows/${id}`,
          {
            withCredentials: true,
          }
        );

        fetchShows();

      } catch (error) {

        console.log(error);

      }
    };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="flex gap-3">

          <div className="w-5 h-5 rounded-full bg-[#FF4D00] animate-bounce" />

          <div className="w-5 h-5 rounded-full bg-[#E61919] animate-bounce delay-150" />

          <div className="w-5 h-5 rounded-full bg-[#FFCC00] animate-bounce delay-300" />

        </div>
      </div>
    );
  }

  return (
    <section className="text-white">

      {/* TOP */}
      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Manage
          <span className="text-[#FF4D00]">
            {" "}Shows
          </span>
        </h1>

        <p className="text-gray-400 text-lg mt-4">
          Create and manage movie shows.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-white/[0.03] border border-white/10 rounded-3xl p-8"
      >

        {/* MOVIE */}
        <select
          name="movie"
          value={showData.movie}
          onChange={handleChange}
          className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
        >

          <option value="">
            Select Movie
          </option>

          {movies.map((movie) => (
            <option
              key={movie._id}
              value={movie._id}
              className="bg-[#111]"
            >
              {movie.title}
            </option>
          ))}

        </select>

        {/* THEATER */}
        <input
          type="text"
          name="theater"
          placeholder="Theater Name"
          value={showData.theater}
          onChange={handleChange}
          className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={showData.date}
          onChange={handleChange}
          className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        {/* SCREEN */}
        <input
          type="text"
          name="screen"
          placeholder="Screen / Audi"
          value={showData.screen}
          onChange={handleChange}
          className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        {/* TIMINGS */}
        <input
          type="text"
          name="timings"
          placeholder="09:20 AM, 01:30 PM"
          value={showData.timings}
          onChange={handleChange}
          className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
        />

        {/* BUTTON */}
        <button className="group relative overflow-hidden flex items-center justify-center gap-3 bg-[#FF4D00] px-6 py-4 rounded-2xl font-semibold shadow-[0_0_20px_rgba(255,77,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,77,0,0.55)] xl:col-span-3">

          <Plus size={22} />

          Create Show

        </button>
      </form>

      {/* SHOWS */}
      <div className="mt-14 grid grid-cols-1 xl:grid-cols-2 gap-8">

        {shows.map((show) => (

          <div
            key={show._id}
            className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-[#FF4D00]/30 transition-all duration-300"
          >

            {/* TOP */}
            <div className="p-6 flex gap-5">

              {/* POSTER */}
              <img
                src={show?.movie?.poster}
                alt={show?.movie?.title}
                className="w-[110px] h-[160px] rounded-2xl object-cover"
              />

              {/* INFO */}
              <div className="flex-1">

                <h2 className="text-3xl font-black">
                  {show?.movie?.title}
                </h2>

                {/* THEATER */}
                <div className="flex items-center gap-3 mt-5 text-gray-300">

                  <MapPin
                    size={20}
                    className="text-[#FFCC00]"
                  />

                  <span>
                    {show?.theater}
                  </span>
                </div>

                {/* DATE */}
                <div className="flex items-center gap-3 mt-4 text-gray-300">

                  <CalendarDays
                    size={20}
                    className="text-[#FFCC00]"
                  />

                  <span>
                    {show?.date}
                  </span>
                </div>

                {/* SCREEN */}
                <div className="flex items-center gap-3 mt-4 text-gray-300">

                  <Film
                    size={20}
                    className="text-[#FFCC00]"
                  />

                  <span>
                    {show?.screen}
                  </span>
                </div>

                {/* TIMINGS */}
                <div className="flex items-start gap-3 mt-4 text-gray-300">

                  <Clock3
                    size={20}
                    className="text-[#FFCC00] mt-1"
                  />

                  <div className="flex flex-wrap gap-2">

                    {show?.timings?.map(
                      (
                        time,
                        index
                      ) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] font-semibold"
                        >
                          {time}
                        </span>
                      )
                    )}

                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-white/10 px-6 py-5 flex items-center justify-between">

              <div className="text-sm text-gray-400">
                Total Timings:{" "}
                <span className="text-white font-semibold">
                  {
                    show?.timings
                      ?.length
                  }
                </span>
              </div>

              {/* DELETE */}
              <button
                onClick={() =>
                  deleteShow(
                    show._id
                  )
                }
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              >

                <Trash2 size={18} />

                Delete

              </button>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ManageShows;