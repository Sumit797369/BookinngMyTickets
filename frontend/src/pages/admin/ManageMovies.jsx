import React, { useEffect, useState } from "react";

import axios from "axios";

import { Search, Pencil, Trash2, Film, Plus } from "lucide-react";

import { serverUrl } from "../../App";
import { useNavigate } from "react-router-dom";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/movies`, {
        withCredentials: true,
      });

      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this movie?");

      if (!confirmDelete) return;

      await axios.delete(`${serverUrl}/api/movies/${id}`, {
        withCredentials: true,
      });

      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-black">Manage Movies</h1>

          <p className="text-gray-400 mt-2">Manage all uploaded movies</p>
        </div>

        <button
  onClick={() =>
    navigate("/admin/add-movie")
  }
  className="group relative overflow-hidden flex items-center gap-3 bg-[#FF4D00] px-6 py-3 rounded-2xl font-semibold shadow-[0_0_20px_rgba(255,77,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,77,0,0.55)]"
>
  {/* Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />

  {/* Shine Effect */}
  <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 group-hover:left-[120%] transition-all duration-700" />

  {/* Content */}
  <div className="relative z-10 flex items-center gap-3">
    <Plus
      size={22}
      className="group-hover:rotate-90 transition-all duration-300"
    />

    Add Movie
  </div>
</button>
      </div>

      {/* SEARCH */}
      <div className="mb-8">
        <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4">
          <Search className="text-gray-400" />

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none ml-4 w-full text-white"
          />
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center h-[300px] text-2xl font-bold">
          Loading Movies...
        </div>
      ) : filteredMovies.length === 0 ? (
        /* EMPTY */
        <div className="flex flex-col items-center justify-center h-[400px] border border-dashed border-white/10 rounded-3xl bg-white/[0.03]">
          <Film size={70} className="text-[#FF4D00] mb-5" />

          <h2 className="text-3xl font-black mb-3">No Movies Found</h2>

          <p className="text-gray-400">Add your first movie to get started</p>
        </div>
      ) : (
        /* MOVIES GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
          {filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            >
              {/* POSTER */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* ACTIONS */}
                <div className="absolute top-4 right-4 flex gap-3">
                  {/* EDIT */}
                  <button className="w-11 h-11 rounded-2xl bg-black/50 backdrop-blur-xl flex items-center justify-center hover:bg-[#FF4D00] transition-all">
                    <Pencil size={20} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteMovie(movie._id)}
                    className="w-11 h-11 rounded-2xl bg-black/50 backdrop-blur-xl flex items-center justify-center hover:bg-red-500 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* MOVIE INFO */}
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <h2 className="text-2xl font-black mb-2">{movie.title}</h2>

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span>{movie.language}</span>

                    <span>•</span>

                    <span>{movie.duration}</span>
                  </div>

                  {/* GENRES */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {movie.genre?.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#FF4D00]/20 text-[#FF4D00] text-xs font-semibold border border-[#FF4D00]/20"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
