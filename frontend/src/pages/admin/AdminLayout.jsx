// pages/admin/AdminLayout.jsx

import React from "react";

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
import { serverUrl } from "../../App";
import axios from "axios";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] =
  useState(false);

// DUMMY USER
const adminUser = {
  name: "PVR Admin",

  profilePicture: "",
};

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
  const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

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

    {
      name: "Shows",
      icon: CalendarDays,
      path: "/admin/shows",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[290px] bg-white/[0.03] border-r border-white/10 backdrop-blur-xl flex flex-col justify-between p-6">
        <div>
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-3 mb-14">
            <img
              src="/bmt3.png"
              alt="logo"
              className="w-14 h-14 object-contain"
            />

            <h1 className="text-3xl font-black italic text-[#FF4D00]">Admin</h1>
          </Link>

          {/* Menu */}
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

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#E61919] hover:bg-red-600 transition-all duration-300 font-semibold text-lg shadow-[0_0_25px_rgba(230,25,25,0.35)]"
        >
          <LogOut size={22} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Orange Glow */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

        {/* Red Glow */}
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#E61919]/10 blur-[120px] rounded-full" />

        <div className="relative z-10 p-8 md:p-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
