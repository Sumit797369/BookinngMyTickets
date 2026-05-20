// components/Footer.jsx

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#FF4D00]/20 overflow-hidden">

      {/* Orange Glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      {/* Red Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      <div className="relative z-10 px-6 md:px-16 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-24">

          {/* Brand */}
          <div>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src="/bmt3.png"
                alt="logo"
                className="w-12 h-12 object-contain"
              />

              <h1 className="text-[#FF4D00] text-3xl font-bold italic">
                ookMyTickets
              </h1>
            </Link>

            <p className="text-gray-400 mt-6 leading-relaxed max-w-sm">
              Book movie tickets instantly and enjoy
              the latest blockbuster experience with
              a premium cinematic vibe.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-10">

            <h3 className="text-white text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              {[
                {
                  name: "Home",
                  path: "/",
                },

                {
                  name: "Movies",
                  path: "/movies",
                },

                {
                  name: "Favorites",
                  path: "/favorite",
                },

                {
                  name: "My Bookings",
                  path: "/my-bookings",
                },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-400 hover:text-[#FF4D00] transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:ml-10">

            <h3 className="text-white text-2xl font-bold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-4 text-gray-400">
                
                <Mail
                  className="text-[#FF4D00]"
                  size={20}
                />

                support@bookmytickets.com
              </div>

              <div className="flex items-center gap-4 text-gray-400">
                
                <Phone
                  className="text-[#FF4D00]"
                  size={20}
                />

                +91 98765 43210
              </div>

              <div className="flex items-start gap-4 text-gray-400">
                
                <MapPin
                  className="text-[#FF4D00] mt-1"
                  size={20}
                />

                Mumbai, Maharashtra, India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 BookMyTickets. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">

            <button className="text-gray-500 hover:text-[#FF4D00] transition-all duration-300">
              Privacy Policy
            </button>

            <button className="text-gray-500 hover:text-[#FF4D00] transition-all duration-300">
              Terms & Conditions
            </button>

            <button className="text-gray-500 hover:text-[#FF4D00] transition-all duration-300">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;