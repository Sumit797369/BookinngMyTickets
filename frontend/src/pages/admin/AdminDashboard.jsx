import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Film,
  Ticket,
  CalendarDays,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";
import jsPDF from "jspdf";
import { serverUrl } from "../../App";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/admin/dashboard`, {
        withCredentials: true,
      });

      setDashboardData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const exportDashboard = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("BookMyTickets Dashboard Report", 20, 20);

    doc.setFontSize(14);

    doc.text(`Total Movies: ${dashboardData?.totalMovies || 0}`, 20, 50);

    doc.text(`Total Bookings: ${dashboardData?.totalBookings || 0}`, 20, 65);

    doc.text(`Total Shows: ${dashboardData?.totalShows || 0}`, 20, 80);

    doc.text(`Revenue: ₹${dashboardData?.totalRevenue || 0}`, 20, 95);

    doc.save("dashboard-report.pdf");
  };
  // STATS
  const stats = [
    {
      title: "Total Movies",

      value: dashboardData?.totalMovies || 0,

      icon: Film,

      color: "from-orange-500 to-red-500",
    },

    {
      title: "Total Bookings",

      value: dashboardData?.totalBookings || 0,

      icon: Ticket,

      color: "from-red-500 to-pink-500",
    },

    {
      title: "Total Shows",

      value: dashboardData?.totalShows || 0,

      icon: CalendarDays,

      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Revenue",

      value: `₹${dashboardData?.totalRevenue || 0}`,

      icon: IndianRupee,

      color: "from-green-500 to-emerald-500",
    },
  ];

  // RECENT BOOKINGS
  const recentBookings = dashboardData?.recentBookings || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black">Admin Dashboard</h1>

          <p className="text-gray-400 mt-2">
            Manage your movies, shows and bookings
          </p>
        </div>

        {/* GROWTH */}
        <div className="flex items-center gap-3 bg-white/[0.05] border border-white/10 px-5 py-3 rounded-2xl">
          {dashboardData?.revenueGrowth >= 0 ? (
            <TrendingUp className="text-green-500" />
          ) : (
            <TrendingDown className="text-red-500" />
          )}

          <span
            className={`font-semibold ${
              dashboardData?.revenueGrowth >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {dashboardData?.revenueGrowth || 0}% Revenue this month
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            {/* GLOW */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-20 blur-3xl`}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{item.title}</p>

                <h2 className="text-4xl font-black">{item.value}</h2>
              </div>

              <div
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.color}`}
              >
                <item.icon size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        {/* REVENUE CHART */}
        <div className="xl:col-span-2 bg-white/[0.04] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Revenue Overview</h2>

              <p className="text-gray-400 text-sm mt-1">
                Last 7 days performance
              </p>
            </div>

            <button
              onClick={exportDashboard}
              className="px-4 py-2 rounded-xl bg-[#FF4D00] font-semibold"
            >
              Export
            </button>
          </div>

          {/* CHART */}
        <div className="flex items-end gap-2 md:gap-4 h-[220px] md:h-[280px]">
            {(
              dashboardData?.revenueData || [60, 90, 120, 80, 150, 110, 170]
            ).map((height, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-3"
              >
                <div
                  style={{
                    height: typeof height === "number" ? height : 50,
                  }}
                  className="w-full rounded-t-2xl bg-gradient-to-t from-[#FF4D00] to-orange-300"
                />

                <span className="text-sm text-gray-400">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* OCCUPANCY */}
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Occupancy</h2>

              <p className="text-gray-400 text-sm mt-1">Theater performance</p>
            </div>

            <Users className="text-[#FF4D00]" />
          </div>

          <div className="flex items-center justify-center h-[280px]">
            <div className="relative w-52 h-52 rounded-full border-[18px] border-[#FF4D00] flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-black">
                  {dashboardData?.occupancy || 0}%
                </h2>

                <p className="text-gray-400 mt-2">Seat Occupancy</p>
              </div>

              <div className="absolute inset-0 rounded-full border-[18px] border-white/10 border-t-transparent rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Recent Bookings</h2>

            <p className="text-gray-400 text-sm mt-1">
              Latest customer bookings
            </p>
          </div>

          <button className="px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-all">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-left text-gray-400">
                <th className="pb-4">Customer</th>

                <th className="pb-4">Movie</th>

                <th className="pb-4">Seats</th>

                <th className="pb-4">Amount</th>

                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-all"
                >
                  <td className="py-5 font-semibold">{booking.user?.name}</td>

                  <td className="py-5">{booking.movie?.title}</td>

                  <td className="py-5">{booking.seats?.join(", ")}</td>

                  <td className="py-5 text-[#FF4D00] font-bold">
                    ₹{booking.amount}
                  </td>

                  <td className="py-5">
                    <span className="px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-semibold">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
