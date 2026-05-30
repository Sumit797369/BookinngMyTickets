// pages/admin/AdminLayout.jsx

import React, { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Film,
  PlusSquare,
  Ticket,
  CalendarDays,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { serverUrl } from "../../App";

// import { serverUrl } from "../../App";

const AdminLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  // DROPDOWN
  const [showDropdown, setShowDropdown] = useState(false);

  // ADMIN USER
  const [adminUser, setAdminUser] = useState(null);

  // FETCH ADMIN
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/auth/check-admin`, {
        withCredentials: true,
      });

      setAdminUser({
        name: "Admin",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      navigate("/admin-login");
    } catch (error) {
      console.log(error);
    }
  };

  // INITIALS
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // MENU
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },

    {
      name: "Manage Movies",
      icon: Film,
      path: "/admin/movies",
    },

    {
      name: "Add Movie",
      icon: PlusSquare,
      path: "/admin/add-movie",
    },

    {
      name: "Bookings",
      icon: Ticket,
      path: "/admin/bookings",
    },

    // {
    //   name: "Shows",
    //   icon: CalendarDays,
    //   path: "/admin/shows",
    // },
  ];

  return (
    <section className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-[290px] h-screen sticky top-0 bg-white/[0.03] border-r border-white/10 backdrop-blur-xl flex flex-col justify-between p-6 flex-shrink-0">
        <div>
          {/* LOGO */}
          <Link to="/admin" className="flex items-center gap-3 mb-14">
            <img
              src="/bmt3.png"
              alt="logo"
              className="w-14 h-14 object-contain"
            />

            <h1 className="text-3xl font-black italic text-[#FF4D00]">Admin</h1>
          </Link>

          {/* MENU */}
          <div className="space-y-4">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-[#FF4D00] text-white shadow-[0_0_25px_rgba(255,77,0,0.35)]"
                      : "hover:bg-white/[0.05] text-gray-300"
                  }`}
                >
                  <item.icon size={24} />

                  <span className="text-lg font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="relative">
          {/* BUTTON */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between gap-3 bg-white/[0.04] border border-white/10 hover:border-[#FF4D00]/40 px-4 py-4 rounded-2xl transition-all duration-300"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* PROFILE */}
              {adminUser?.profilePicture ? (
                <img
                  src={adminUser.profilePicture}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#FF4D00] flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_rgba(255,77,0,0.35)]">
                  {getInitials(adminUser?.name || "Admin")}
                </div>
              )}

              {/* NAME */}
              <div className="text-left">
                <h3 className="font-semibold">{adminUser?.name || "Admin"}</h3>

                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>

            {/* ICON */}
            <ChevronDown
              size={20}
              className={`transition-all duration-300 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {showDropdown && (
            <div className="absolute bottom-[90px] left-0 w-full bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.45)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* VIEW PROFILE */}
              <Link
                to="/admin/profile"
                className="flex items-center gap-3 px-5 py-4 hover:bg-white/[0.05] transition-all duration-300"
              >
                <User size={20} />

                <span className="font-medium">View Profile</span>
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-500/10 text-red-400 transition-all duration-300"
              >
                <LogOut size={20} />

                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 h-screen overflow-y-auto relative">
        {/* ORANGE GLOW */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

        {/* RED GLOW */}
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#E61919]/10 blur-[120px] rounded-full" />

        {/* CONTENT */}
        <div className="relative z-10 p-8 md:p-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
