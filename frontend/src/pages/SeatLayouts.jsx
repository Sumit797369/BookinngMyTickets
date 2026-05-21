// pages/SeatLayouts.jsx

import React, { useEffect, useMemo, useState } from "react";

import { Clock3 } from "lucide-react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// import { toast } from "react-toastify";

const SeatLayouts = () => {
  const navigate = useNavigate();

  const { seats } = useParams();

  const location = useLocation();

  const { theater, movie } = location.state || {};

  // Current Timing
  const initialTime = decodeURIComponent(seats || "").trim();

  const [selectedTime, setSelectedTime] = useState(initialTime);
  // Selected Seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Loading
  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  // Timings
  const timings = [
    "09:20 AM",
    "01:30 PM",
    "11:25 AM",
    "04:30 PM",
    "10:30 AM",
    "07:00 PM",
  ].map((time) => time.trim());
  // Different booked seats according to timing
  const bookedSeats = useMemo(() => {
    // Morning show
    if (selectedTime.includes("09") || selectedTime.includes("10")) {
      return ["C8", "D8", "E5"];
    }

    // Afternoon
    if (selectedTime.includes("01") || selectedTime.includes("04")) {
      return ["A3", "B5", "C8", "D8", "F4", "G7"];
    }

    // Evening/Night
    return [
      "A2",
      "A3",
      "A5",
      "B4",
      "B5",
      "C7",
      "C8",
      "D8",
      "D9",
      "E4",
      "F3",
      "F7",
      "G5",
      "H8",
      "I4",
      "J7",
    ];
  }, [selectedTime]);

  // Seat Layout
  const rows = [
    {
      row: "A",
      seats: 9,
    },

    {
      row: "B",
      seats: 9,
    },

    {
      row: "C",
      seats: 9,
    },

    {
      row: "D",
      seats: 9,
    },

    {
      row: "E",
      seats: 9,
    },

    {
      row: "F",
      seats: 9,
    },

    {
      row: "G",
      seats: 9,
    },

    {
      row: "H",
      seats: 9,
    },

    {
      row: "I",
      seats: 9,
    },

    {
      row: "J",
      seats: 9,
    },
  ];

  // Seat Select
  const handleSeatClick = (seatId) => {
    // Already booked
    if (bookedSeats.includes(seatId)) {
      toast.error("This seat is already booked");

      return;
    }

    // Toggle
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId],
    );
  };

  // Checkout
  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select the seat");

      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success("Proceeding to checkout 🚀");
    }, 1800);
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-[#FF4D00] animate-bounce" />

          <div className="w-5 h-5 rounded-full bg-[#E61919] animate-bounce delay-150" />

          <div className="w-5 h-5 rounded-full bg-[#FFCC00] animate-bounce delay-300" />
        </div>
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden pt-28 pb-20 px-4 md:px-10">
      {/* Orange Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#FF4D00]/10 blur-[140px] rounded-full" />

      {/* Red Glow */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#E61919]/10 blur-[140px] rounded-full" />

      <div className="relative z-10">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] bg-white/[0.03] border border-white/10 rounded-3xl p-6 h-fit backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Available Timings</h2>

            {/* Timings */}
            <div className="space-y-4 mt-8">
              {timings.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full min-h-[78px] px-5 rounded-3xl border flex items-center justify-center gap-3 text-xl font-semibold transition-all duration-300 ${
                    selectedTime.trim() === time.trim()
                      ? "bg-green-500 border-green-500 text-white shadow-[0_0_35px_rgba(34,197,94,0.55)] scale-[1.03]"
                      : "bg-white/[0.04] border-white/10 text-gray-300 hover:border-green-500/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <Clock3 size={22} />

                  <span className="whitespace-nowrap">{time}</span>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-[#FF4D00]" />

                <span className="text-gray-300">Selected</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-white/20 bg-white/5" />

                <span className="text-gray-300">Available</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-gray-600" />

                <span className="text-gray-300">Booked</span>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 max-w-[1200px] mx-auto">
            {/* Movie */}
            <div className="mb-10">
              <h1 className="text-4xl font-black">{movie?.Title}</h1>

              <p className="text-gray-400 mt-2">{theater}</p>
            </div>

            {/* Screen */}
            <div className="flex flex-col items-center mb-16">
              <div className="w-full max-w-4xl h-16 rounded-t-[100%] border-t-[8px] border-[#FF4D00]/70" />

              <p className="text-gray-400 tracking-[10px] text-sm -mt-4">
                SCREEN
              </p>
            </div>

            {/* Seats */}
            <div className="overflow-x-auto">
              <div className="w-full flex flex-col items-center gap-8">
                {/* Regular Rows */}
                {["A", "B", "C", "D", "E", "F"].map((row, rowIndex) => (
                  <div key={rowIndex} className="flex items-center justify-center gap-6 xl:gap-12">
                    {/* LEFT BLOCK */}
                    <div className="flex gap-3">
                      {Array.from({
                        length: 10,
                      }).map((_, index) => {
                        const seatId = `${row}${index + 1}`;

                        const isBooked = bookedSeats.includes(seatId);

                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => handleSeatClick(seatId)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg border text-sm font-semibold transition-all duration-300 ${
                              isBooked
                                ? "bg-gray-700 border-gray-700 text-white/70"
                                : isSelected
                                  ? "bg-[#FF4D00] border-[#FF4D00] text-white shadow-[0_0_25px_rgba(255,77,0,0.45)] scale-110"
                                  : "bg-transparent border-[#FF4D00]/70 text-white hover:bg-[#FF4D00]/10 hover:scale-105"
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>

                    {/* RIGHT BLOCK */}
                    <div className="flex gap-3">
                      {Array.from({
                        length: 10,
                      }).map((_, index) => {
                        const seatId = `${row}${index + 11}`;

                        const isBooked = bookedSeats.includes(seatId);

                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => handleSeatClick(seatId)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg border text-sm font-semibold transition-all duration-300 ${
                              isBooked
                                ? "bg-gray-700 border-gray-700 text-white/70"
                                : isSelected
                                  ? "bg-[#FF4D00] border-[#FF4D00] text-white shadow-[0_0_25px_rgba(255,77,0,0.45)] scale-110"
                                  : "bg-transparent border-[#FF4D00]/70 text-white hover:bg-[#FF4D00]/10 hover:scale-105"
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Recliner Section */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-10">
                  {/* Recliner Left */}
                  <div className="flex gap-5">
                    {Array.from({
                      length: 5,
                    }).map((_, index) => {
                      const seatId = `R${index + 1}`;

                      const isBooked = bookedSeats.includes(seatId);

                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`w-20 h-14 md:w-24 md:h-16 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                            isBooked
                              ? "bg-gray-700 border-gray-700 text-white/70"
                              : isSelected
                                ? "bg-[#FFCC00] border-[#FFCC00] text-black shadow-[0_0_25px_rgba(255,204,0,0.5)] scale-110"
                                : "bg-white/5 border-[#FFCC00]/70 text-[#FFCC00] hover:bg-[#FFCC00]/10 hover:scale-105"
                          }`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>

                  {/* Recliner Right */}
                  <div className="flex gap-5">
                    {Array.from({
                      length: 5,
                    }).map((_, index) => {
                      const seatId = `R${index + 6}`;

                      const isBooked = bookedSeats.includes(seatId);

                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`w-24 h-16 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                            isBooked
                              ? "bg-gray-700 border-gray-700 text-white/70"
                              : isSelected
                                ? "bg-[#FFCC00] border-[#FFCC00] text-black shadow-[0_0_25px_rgba(255,204,0,0.5)] scale-110"
                                : "bg-white/5 border-[#FFCC00]/70 text-[#FFCC00] hover:bg-[#FFCC00]/10 hover:scale-105"
                          }`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recliner Label */}
                <p className="text-[#FFCC00] font-semibold tracking-[5px] text-sm mt-2">
                  PREMIUM RECLINERS
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-16 w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Selected Seats */}
              <div>
                <h3 className="text-2xl font-bold">Selected Seats</h3>

                <p className="text-gray-400 mt-3">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "No seats selected"}
                </p>
              </div>

              {/* Total */}
              <div className="text-center">
                <h2 className="text-5xl font-black text-[#FF4D00]">
                  ₹
                  {selectedSeats.reduce(
                    (total, seat) =>
                      seat.startsWith("R") ? total + 500 : total + 250,
                    0,
                  )}
                </h2>

                <p className="text-gray-400 mt-2">Total Amount</p>
              </div>

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full lg:w-auto px-10 py-5 rounded-2xl bg-[#FF4D00] hover:bg-[#ff5d1f] text-white font-bold text-lg transition-all duration-300 shadow-[0_0_35px_rgba(255,77,0,0.45)] hover:scale-105 active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce" />

                    <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-150" />

                    <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-300" />
                  </div>
                ) : (
                  "Proceed To Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatLayouts;
