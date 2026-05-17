import React, { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { serverUrl } from "../App";
import { useRef } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [user, setUser] = useState(null);
  const profileRef = useRef();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/theaters" },
    { name: "Releases", path: "/releases" },
    { name: "Favorites", path: "/favorite" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/auth/me`, {
          withCredentials: true,
        });

        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="w-full bg-[#0A0A0A] border border-[#FF4D00]/40  shadow-[0_0_25px_rgba(255,77,0,0.25)] overflow-visible sticky top-0 z-50">
        {/* Glow Line */}
        <div className="h-[2px] w-full bg-[#FF4D00] shadow-[0_0_12px_#FF4D00]" />

        <div className="flex items-center justify-between px-5 md:px-10 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src="/bmt3.png"
              alt="logo"
              className="w-11 h-11 object-contain"
            />

            <h1 className="text-[#FF4D00] text-lg md:text-2xl font-bold italic tracking-wide">
              ookMyTickets
            </h1>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10 text-white font-medium text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative transition-all duration-300 hover:text-[#FF4D00] ${
                      isActive ? "text-[#FF4D00]" : "text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}

                      {isActive && (
                        <div className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#FF4D00] shadow-[0_0_10px_#FF4D00]" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="text-white hover:text-[#FF4D00] transition-all duration-300">
              <Search size={24} />
            </button>

            {/* Login/Profile */}
            {user ? (
              <div ref={profileRef} className="relative">
                {/* Avatar */}
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-11 h-11 rounded-full border-2 border-[#FF4D00] overflow-hidden flex items-center justify-center bg-[#1A1A1A] text-white font-bold text-lg"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                  )}
                </button>

                {/* Dropdown */}
                {showProfileMenu && (
                  <div className="absolute top-14 right-0 w-56 bg-[#111] border border-[#FF4D00]/30 rounded-2xl shadow-[0_0_20px_rgba(255,77,0,0.2)] overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <h3 className="text-white font-semibold">{user.name}</h3>

                      <p className="text-gray-400 text-sm truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-3 text-white hover:bg-[#FF4D00]/10 transition-all duration-300"
                    >
                      View Profile
                    </Link>
                    {/* Logout */}
                    <button
                      onClick={async () => {
                        await axios.get(`${serverUrl}/api/auth/logout`, {
                          withCredentials: true,
                        });

                        setUser(null);

                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="border border-[#FF4D00] text-[#FF4D00] px-5 py-2 rounded-xl text-base font-semibold hover:bg-[#FF4D00] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,77,0,0.35)]"
              >
                Login
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white hover:text-[#FF4D00] transition-all duration-300"
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-[#111] border-t border-[#FF4D00]/20 overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-96 py-5" : "max-h-0"
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#FF4D00]"
                      : "text-white hover:text-[#FF4D00]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Login open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
