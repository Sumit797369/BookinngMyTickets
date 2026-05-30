// pages/SeatLayouts.jsx

import React, { useEffect, useState } from "react";

import { Clock3 } from "lucide-react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import axios from "axios";

import { serverUrl } from "../App";

const SeatLayouts = () => {
  const navigate = useNavigate();

  const { seats, date } = useParams();

  const location = useLocation();

  const { theater, movie } = location.state || {};

  // CURRENT TIME
  const initialTime = decodeURIComponent(seats || "").trim();

  const [selectedTime, setSelectedTime] = useState(initialTime);

  // SELECTED SEATS
  const [selectedSeats, setSelectedSeats] = useState([]);

  // BOOKED SEATS
  const [bookedSeats, setBookedSeats] = useState([]);

  // LOADING
  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  // PAGE LOADER
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  // FETCH BOOKED SEATS
  useEffect(() => {
    fetchBookedSeats();
  }, [movie, selectedTime]);

  const fetchBookedSeats = async () => {
    try {
      if (!movie) return;

      let movieId = movie?._id;

      // IF OMDB MOVIE
      if (movie?._id?.startsWith("tt")) {
        const { data } = await axios.post(
          `${serverUrl}/api/movies/create-omdb`,
          {
            title: movie.title,

            description: movie.description,

            poster: movie.poster,

            language: movie.language,

            duration: movie.duration,

            genre: movie.genre,
          },
        );

        movieId = data._id;
      }
      const { data } = await axios.get(
        `${serverUrl}/api/bookings/booked-seats/${movieId}`,
        {
          params: {
            date,

            time: selectedTime,
          },
        },
      );

      setBookedSeats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // TIMINGS
  const timings = [
    "09:20 AM",
    "01:30 PM",
    "11:25 AM",
    "04:30 PM",
    "10:30 AM",
    "07:00 PM",
  ].map((time) => time.trim());

  // SEAT LAYOUT
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // SELECT SEAT
  const handleSeatClick = (seatId) => {
    // ALREADY BOOKED
    if (bookedSeats.includes(seatId)) {
      toast.error("This seat has already been booked");

      return;
    }

    // TOGGLE
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId],
    );
  };

  // CHECKOUT
  const handleCheckout = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select seats");

      return;
    }

    try {
      setLoading(true);

      let finalMovieId = movie?._id;

      // OMDB MOVIE
      if (movie?._id?.startsWith("tt")) {
        const { data } = await axios.post(
          `${serverUrl}/api/movies/create-omdb`,
          {
            title: movie.title,

            description: movie.description,

            poster: movie.poster,

            language: movie.language,

            duration: movie.duration,

            genre: movie.genre,
          },
        );

        finalMovieId = data._id;
      }

      // TOTAL
      const totalAmount = selectedSeats.reduce(
        (total, seat) => (seat.startsWith("R") ? total + 500 : total + 250),
        0,
      );

      // CREATE ORDER
      const { data } = await axios.post(
        `${serverUrl}/api/payment/create-order`,
        {
          amount: totalAmount,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.amount,

        currency: data.currency,

        name: "Movie Booking",

        description: "Movie Ticket Booking",

        order_id: data.id,

        handler: async (response) => {
          // VERIFY PAYMENT
          await axios.post(
            `${serverUrl}/api/payment/verify-payment`,
            {
              ...response,

              bookingData: {
                movie: finalMovieId,

                seats: selectedSeats,

                amount: totalAmount,

                theater,

                date,

                time: selectedTime,
              },
            },
            {
              withCredentials: true,
            },
          );
          fetchBookedSeats();

          toast.success("Payment successful 🍿");

          navigate("/my-bookings");
        },

        theme: {
          color: "#FF4D00",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // PAGE LOADER
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
      {/* ORANGE GLOW */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#FF4D00]/10 blur-[140px] rounded-full" />

      {/* RED GLOW */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#E61919]/10 blur-[140px] rounded-full" />

      <div className="relative z-10">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR */}
          <div className="w-full lg:w-[280px] bg-white/[0.03] border border-white/10 rounded-3xl p-6 h-fit backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Available Timings</h2>

            {/* TIMINGS */}
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

            {/* LEGEND */}
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
                <div className="w-5 h-5 rounded bg-gray-700" />

                <span className="text-gray-300">Booked</span>
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="flex-1 max-w-[1200px] mx-auto">
            {/* MOVIE */}
            <div className="mb-10">
              <h1 className="text-4xl font-black">{movie?.title}</h1>

              <p className="text-gray-400 mt-2">{theater}</p>
            </div>

            {/* SCREEN */}
            <div className="flex flex-col items-center mb-16">
              <div className="w-full max-w-4xl h-16 rounded-t-[100%] border-t-[8px] border-[#FF4D00]/70" />

              <p className="text-gray-400 tracking-[10px] text-sm -mt-4">
                SCREEN
              </p>
            </div>

            {/* SEATS */}
            <div className="overflow-x-auto">
              <div className="w-full flex flex-col items-center gap-8">
                {rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center justify-center gap-6 xl:gap-12"
                  >
                    {/* LEFT */}
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
                                ? "bg-gray-700 border-gray-700 text-white/70 cursor-not-allowed"
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

                    {/* RIGHT */}
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
                                ? "bg-gray-700 border-gray-700 text-white/70 cursor-not-allowed"
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
              </div>
            </div>
            {/* RECLINER SEATS */}
            <div className="mt-16 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-[#FFCC00] mb-8">
                Recliner Seats
              </h2>

              <div className="flex flex-wrap justify-center gap-6">
                {Array.from({
                  length: 8,
                }).map((_, index) => {
                  const seatId = `R${index + 1}`;

                  const isBooked = bookedSeats.includes(seatId);

                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      onClick={() => handleSeatClick(seatId)}
                      className={`px-7 py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                        isBooked
                          ? "bg-gray-700 border-gray-700 text-white/70 cursor-not-allowed"
                          : isSelected
                            ? "bg-[#FFCC00] border-[#FFCC00] text-black shadow-[0_0_30px_rgba(255,204,0,0.6)] scale-110"
                            : "bg-[#2A2A2A] border-[#FFCC00]/60 text-[#FFCC00] hover:bg-[#FFCC00]/10 hover:scale-105"
                      }`}
                    >
                      {seatId}
                    </button>
                  );
                })}
              </div>

              <p className="text-gray-400 mt-5">Recliner Seats • ₹500</p>
            </div>
            {/* BOTTOM */}
            <div className="mt-16 w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* SELECTED */}
              <div>
                <h3 className="text-2xl font-bold">Selected Seats</h3>

                <p className="text-gray-400 mt-3">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "No seats selected"}
                </p>
              </div>

              {/* TOTAL */}
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

              {/* CHECKOUT */}
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
