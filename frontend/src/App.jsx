import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayouts from "./pages/SeatLayouts";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ChooseShow from "./pages/ChooseShow";

import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";

import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";
import AdminLogin from "./pages/admin/AdminLoging";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

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
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />

        <Route
          path="/movies/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/movie/:id/shows/:date"
          element={<ChooseShow />}
        />

        <Route
          path="/movie/:id/shows/:date/:seats"
          element={<SeatLayouts />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/favorite"
          element={<Favorite />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route
            index
            element={
              <h1 className="text-white text-5xl font-black">
                Dashboard
              </h1>
            }
          />

          <Route
            path="manage-movies"
            element={
              <h1 className="text-white text-5xl font-black">
                Manage Movies
              </h1>
            }
          />

          <Route
            path="add-movie"
            element={
              <h1 className="text-white text-5xl font-black">
                Add Movie
              </h1>
            }
          />

          <Route
            path="bookings"
            element={
              <h1 className="text-white text-5xl font-black">
                Bookings
              </h1>
            }
          />

          <Route
            path="shows"
            element={
              <h1 className="text-white text-5xl font-black">
                Shows
              </h1>
            }
          />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;