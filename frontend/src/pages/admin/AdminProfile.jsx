// pages/Profile.jsx

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Camera } from "lucide-react";
// import { serverUrl } from "../App";

import { toast } from "react-hot-toast";
import { serverUrl } from "../../App";

const AdminProfile = () => {
  const [user, setUser] = useState(null);

  const fileInputRef = useRef();

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/admin/profile`, {
          withCredentials: true,
        });

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // Change Profile Picture
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      const { data } = await axios.put(
        `${serverUrl}/api/auth/update-avatar`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUser(data.user);

      toast.success("Profile picture updated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile picture",
      );
    }
    
  };
  const handleUpdateProfile = async () => {
  try {

    const { data } = await axios.put(
      `${serverUrl}/api/auth/update-profile`,
      {
        name: user.name,
        avatar: user.avatar,
      },
      {
        withCredentials: true,
      }
    );

    setUser(data);

    toast.success("Profile updated!");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
        "Failed to update profile"
    );
  }
};

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 flex justify-center">
      {/* Card */}
      <div className="w-full max-w-3xl bg-[#0A0A0A] border border-[#FF4D00]/20 rounded-3xl shadow-[0_0_40px_rgba(255,77,0,0.12)] p-8 md:p-12">
        {/* Heading */}
        <h1 className="text-[#FF4D00] text-5xl font-bold mb-12 text-center">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full border-4 border-[#FF4D00] overflow-hidden shadow-[0_0_25px_rgba(255,77,0,0.35)] bg-[#1A1A1A] flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl text-white">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>

            {/* Change Button */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-[#FF4D00] hover:scale-110 transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,77,0,0.4)]"
            >
              <Camera className="text-black" size={20} />
            </button>

            {/* Hidden Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfileChange}
              hidden
            />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Name */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Full Name
            </label>

            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              className="w-full bg-[#151515] border border-white/10 rounded-2xl px-5 py-4 text-white text-lg outline-none focus:border-[#FF4D00] transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Email Address
            </label>

            <div className="bg-[#151515] border border-white/10 rounded-2xl px-5 py-4 text-gray-300 text-lg">
              {user.email}
            </div>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="w-full mt-4 bg-[#FF4D00] hover:scale-[1.01] transition-all duration-300 text-black font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(255,77,0,0.25)]"
          >
            Save Changes
          </button>
          {/* Provider */}
          <div>
            <label className="text-gray-400 text-sm mb-3 block">
              Account Type
            </label>

            <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] font-semibold capitalize">
              {user.provider}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
