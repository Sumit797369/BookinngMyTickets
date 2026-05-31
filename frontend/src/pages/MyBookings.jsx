import React, { useEffect, useState } from "react";

import axios from "axios";

import { Download, CalendarDays, Clock3, MapPin, Armchair } from "lucide-react";

import jsPDF from "jspdf";

import { serverUrl } from "../App";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  console.log("MY BOOKINGS DATA:", bookings);
  const [loading, setLoading] = useState(true);

  // FETCH BOOKINGS
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/bookings/my-bookings`,
        {
          withCredentials: true,
        },
      );
      console.log("MY BOOKINGS DATA:", data);
      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DOWNLOAD TICKET
  const downloadTicket = (booking) => {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("Movie Ticket", 20, 20);

    doc.line(20, 25, 190, 25);

    // MOVIE
    doc.setFontSize(16);

    doc.text(`Movie: ${booking.movie?.title || "Movie"}`, 20, 40);

    // THEATER
    doc.text(`Theater: ${booking.theater}`, 20, 55);

    // DATE
    doc.text(`Date: ${booking.date}`, 20, 70);

    // TIME
    doc.text(`Time: ${booking.time}`, 20, 85);

    // SEATS
    doc.text(`Seats: ${booking.seats?.join(", ") || "N/A"}`, 20, 100);

    // USER
    doc.text(`Booked By: ${booking.user?.name || "Movie Lover"}`, 20, 115);

    // EMAIL
    doc.text(`Email: ${booking.user?.email || "Booked Successfully"}`, 20, 130);

    // AMOUNT
    doc.text(`Amount Paid: ₹${booking.amount}`, 20, 145);

    // FOOTER
    doc.setFontSize(12);

    doc.text("Enjoy Your Movie 🍿", 20, 180);

    doc.save(`${booking.movie?.title || "ticket"}.pdf`);
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-[#FF4D00] animate-bounce" />

          <div className="w-5 h-5 rounded-full bg-[#E61919] animate-bounce delay-150" />

          <div className="w-5 h-5 rounded-full bg-[#FFCC00] animate-bounce delay-300" />
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0A0A0A] px-6 md:px-16 py-20 text-white relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4D00]/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E61919]/10 blur-[120px] rounded-full" />

      {/* HEADING */}
      <div className="relative z-10 mb-14">
        <h1 className="text-5xl md:text-6xl font-black">
          My
          <span className="text-[#FF4D00]"> Bookings</span>
        </h1>

        <p className="text-gray-400 text-lg mt-4">
          View your booked movie tickets.
        </p>
      </div>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <div className="relative z-10 flex items-center justify-center h-[400px]">
          <h2 className="text-3xl font-bold text-gray-500">No Bookings Yet</h2>
        </div>
      ) : (
        <div className="relative z-10 space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-[#FF4D00]/30 transition-all duration-300"
            >
              <div className="grid md:grid-cols-[250px_1fr]">
                {/* POSTER */}
                <img
                  src={booking.movie?.poster || "/placeholder.jpg"}
                  alt={booking.movie?.title || "Movie"}
                  className="w-full h-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-8">
                  {/* TITLE */}
                  <h2 className="text-4xl font-black text-white">
                    {booking.movie?.title || "Movie"}
                  </h2>

                  {/* INFO */}
                  <div className="flex flex-wrap gap-6 mt-6 text-gray-300">
                    {/* DATE */}
                    <div className="flex items-center gap-2">
                      <CalendarDays size={20} className="text-[#FFCC00]" />

                      <span>{booking.date}</span>
                    </div>

                    {/* TIME */}
                    <div className="flex items-center gap-2">
                      <Clock3 size={20} className="text-[#FFCC00]" />

                      <span>{booking.time}</span>
                    </div>

                    {/* THEATER */}
                    <div className="flex items-center gap-2">
                      <MapPin size={20} className="text-[#FFCC00]" />

                      <span>{booking.theater}</span>
                    </div>

                    {/* SEATS */}
                    <div className="flex items-center gap-2">
                      <Armchair size={20} className="text-[#FFCC00]" />

                      <span>{booking.seats?.join(", ")}</span>
                    </div>
                  </div>

                  {/* USER */}
                  <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                      Booked By
                    </h3>

                    <p className="text-gray-300">{"Sumit Kumar"}</p>

                    <p className="text-gray-500 text-sm mt-1">
                      {"tbeast935@gmail.com"}
                    </p>

                    <p className="text-gray-400 mt-1">+91 7973691474</p>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => downloadTicket(booking)}
                    className="group relative overflow-hidden mt-8 px-8 py-4 rounded-2xl bg-[#FF4D00] text-white font-bold text-lg transition-all duration-300 shadow-[0_0_35px_rgba(255,77,0,0.5)] hover:scale-105 hover:shadow-[0_0_45px_rgba(255,77,0,0.7)] active:scale-95 flex items-center gap-3"
                  >
                    <Download size={22} />

                    <span className="relative z-10">Your Ticket</span>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#E61919] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookings;
