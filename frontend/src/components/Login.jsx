// components/Login.jsx

import React, { useState } from "react";
import { Mail, Lock, X, Eye, EyeOff } from "lucide-react";

import axios from "axios";
import { toast } from "react-hot-toast";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { serverUrl } from "../App";

const Login = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!open) return null;

  // Validation
  const validateRequired = () => {
    if (isSignup && !name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";

    return null;
  };

  // Firebase Errors
  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setErrorMsg("This email is already registered.");
        break;

      case "auth/invalid-email":
        setErrorMsg("Invalid email format.");
        break;

      case "auth/user-not-found":
        setErrorMsg("No account found with this email.");
        break;

      case "auth/wrong-password":
      case "auth/invalid-credential":
        setErrorMsg("Incorrect email or password.");
        break;

      case "auth/network-request-failed":
        setErrorMsg("Network error. Please try again.");
        break;

      case "auth/weak-password":
        setErrorMsg("Password should be at least 6 characters.");
        break;

      default:
        setErrorMsg(error.message || "Authentication failed.");
    }
  };

  // Google Login
  const handleGoogleAuth = async () => {
    try {
      setErrorMsg("");

      const result = await signInWithPopup(auth, provider);

      await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Logged in with Google!");
      window.location.reload();
      onClose();
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        handleFirebaseError(error);

        toast.error(error.message || "Google auth failed");
      }
    }
  };

  // Login
  const handleLogin = async () => {
    const error = validateRequired();

    if (error) {
      setErrorMsg(error);

      return toast.error(error);
    }

    try {
      setErrorMsg("");

      await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Logged in successfully!");
      window.location.reload();

      onClose();
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";

      setErrorMsg(message);

      toast.error(message);
    }
  };

  // Signup
  const handleSignup = async () => {
    const error = validateRequired();

    if (error) {
      setErrorMsg(error);

      return toast.error(error);
    }

    try {
      setErrorMsg("");

      await axios.post(
        `${serverUrl}/api/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Registration successful!");

      setIsSignup(false);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";

      setErrorMsg(message);

      toast.error(message);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[99999] px-4"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#111111] border border-[#FF4D00]/30 rounded-3xl p-8 shadow-[0_0_35px_rgba(255,77,0,0.25)]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#FF4D00] transition-all duration-300"
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

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-gray-400 mt-2">
            {isSignup
              ? "Signup to start booking movies"
              : "Login to continue booking movies"}
          </p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
            {errorMsg}
          </div>
        )}

        {/* Google Auth */}
        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all duration-300"
        >
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

        {/* Form */}
        <div className="space-y-5">
          {/* Name */}
          {isSignup && (
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Full Name
              </label>

              <div className="bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 focus-within:border-[#FF4D00] transition-all duration-300">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent outline-none text-white w-full"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 focus-within:border-[#FF4D00] transition-all duration-300">
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
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Password</label>

            <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 focus-within:border-[#FF4D00] transition-all duration-300">
              <Lock className="text-[#FF4D00]" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder={
                  isSignup ? "Create password" : "Enter your password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-white ml-3 w-full"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-[#FF4D00]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          {!isSignup && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#FF4D00] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="w-full bg-[#FF4D00] text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,77,0,0.4)]"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </div>

        {/* Toggle */}
        <p className="text-center text-gray-400 mt-6">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setErrorMsg("");
            }}
            className="text-[#FF4D00] font-semibold hover:underline"
          >
            {isSignup ? "Login" : "Signup"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
