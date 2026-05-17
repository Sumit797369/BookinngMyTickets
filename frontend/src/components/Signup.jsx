// components/Signup.jsx

import React from "react";
import {
  User,
  Mail,
  Lock,
  X,
} from "lucide-react";

const Signup = ({ setShowSignup, setShowLogin }) => {
  return (
    <div
      onClick={() => setShowSignup(false)}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#111111] border border-[#FF4D00]/30 rounded-3xl p-8 shadow-[0_0_35px_rgba(255,77,0,0.25)]"
      >
        
        {/* Close */}
        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#FF4D00]"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <img
            src="/bmt3.png"
            alt="logo"
            className="w-14 h-14 object-contain"
          />

          <h1 className="text-[#FF4D00] text-3xl font-bold italic">
            ookMyTickets
          </h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold">
            Create Account
          </h2>

          <p className="text-gray-400 mt-2">
            Signup to start booking movies
          </p>
        </div>

        {/* Google Signup */}
        <button className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all duration-300">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-gray-700"></div>

          <span className="text-gray-400 text-sm">OR</span>

          <div className="flex-1 h-[1px] bg-gray-700"></div>
        </div>

        <form className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Full Name
            </label>

            <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3">
              <User className="text-[#FF4D00]" size={20} />

              <input
                type="text"
                placeholder="Enter your name"
                className="bg-transparent outline-none text-white ml-3 w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Email
            </label>

            <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3">
              <Mail className="text-[#FF4D00]" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none text-white ml-3 w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3">
              <Lock className="text-[#FF4D00]" size={20} />

              <input
                type="password"
                placeholder="Create password"
                className="bg-transparent outline-none text-white ml-3 w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF4D00] text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition-all duration-300"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
            className="text-[#FF4D00] font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;