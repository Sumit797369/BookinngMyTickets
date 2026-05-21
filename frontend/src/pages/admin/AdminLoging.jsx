import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
// import { serverUrl } from "../App";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const { data } = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Allow only admin / owner
      if (data.role !== "admin" && data.role !== "owner") {
        toast.error("Access denied");
        return;
      }

      // Save login
    //   localStorage.setItem("adminAuth", "true");

      toast.success("Welcome Admin 🚀");

      navigate("/admin");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed";

      setErrorMsg(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#FF4D00]/30 rounded-3xl p-8 shadow-[0_0_35px_rgba(255,77,0,0.25)]">

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

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold">
            Admin Login
          </h2>

          <p className="text-gray-400 mt-2">
            Login to access admin dashboard
          </p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
            {errorMsg}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm mb-2 block">
            Email Address
          </label>

          <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 focus-within:border-[#FF4D00]">
            <Mail className="text-[#FF4D00]" size={20} />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white ml-3 w-full"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm mb-2 block">
            Password
          </label>

          <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 focus-within:border-[#FF4D00]">
            <Lock className="text-[#FF4D00]" size={20} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white ml-3 w-full"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-[#FF4D00]"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#FF4D00] text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition-all duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;