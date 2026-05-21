import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayouts from "./pages/SeatLayouts";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ChooseShow from "./pages/ChooseShow";
import AdminLayout from "./pages/admin/AdminLayout";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster
        containerStyle={{
          top: 90,
          right: 20,
          zIndex: 999999,
        }}
      />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/shows/:date" element={<ChooseShow />} />
        <Route path="/movie/:id/shows/:date/:seats" element={<SeatLayouts />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <h1 className="text-white text-5xl font-black">Dashboard</h1>
            }
          />

          <Route
            path="movies"
            element={
              <h1 className="text-white text-5xl font-black">Manage Movies</h1>
            }
          />

          <Route
            path="add-movie"
            element={
              <h1 className="text-white text-5xl font-black">Add Movie</h1>
            }
          />

          <Route
            path="bookings"
            element={
              <h1 className="text-white text-5xl font-black">Bookings</h1>
            }
          />

          <Route
            path="shows"
            element={<h1 className="text-white text-5xl font-black">Shows</h1>}
          />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
