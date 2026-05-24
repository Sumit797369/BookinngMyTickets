// pages/admin/ManageBookings.jsx

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  CalendarDays,
  Ticket,
  IndianRupee,
  User,
  Film,
} from "lucide-react";

import { serverUrl } from "../../App";

const ManageBookings = () => {

  const [
    bookings,
    setBookings,
  ] = useState([]);

  const [
    filteredBookings,
    setFilteredBookings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  // FETCH BOOKINGS
  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {
      try {

        const { data } =
          await axios.get(
            `${serverUrl}/api/admin/bookings`,
            {
              withCredentials: true,
            }
          );

        setBookings(data);

        setFilteredBookings(
          data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

  // SEARCH
  useEffect(() => {

    const filtered =
      bookings.filter(
        (booking) =>
          booking?.movie?.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          booking?.user?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          booking?.theater
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredBookings(
      filtered
    );

  }, [search, bookings]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="flex gap-3">

          <div className="w-5 h-5 rounded-full bg-[#FF4D00] animate-bounce" />

          <div className="w-5 h-5 rounded-full bg-[#E61919] animate-bounce delay-150" />

          <div className="w-5 h-5 rounded-full bg-[#FFCC00] animate-bounce delay-300" />

        </div>
      </div>
    );
  }

  return (
    <section className="text-white">

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        {/* TITLE */}
        <div>

          <h1 className="text-5xl font-black">
            Manage
            <span className="text-[#FF4D00]">
              {" "}Bookings
            </span>
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage all movie ticket bookings.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-[400px]">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-[#FF4D00]/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* BOOKINGS */}
      {filteredBookings.length ===
      0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">

          <div className="text-center">

            <Ticket
              size={70}
              className="mx-auto text-[#FF4D00]"
            />

            <h2 className="text-3xl font-black mt-6">
              No Bookings Found
            </h2>

            <p className="text-gray-400 mt-3">
              No movie bookings available.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {filteredBookings.map(
            (booking) => (

              <div
                key={
                  booking._id
                }
                className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-[#FF4D00]/30 transition-all duration-300"
              >

                {/* TOP */}
                <div className="p-6 flex gap-5">

                  {/* POSTER */}
                  <img
                    src={
                      booking
                        ?.movie
                        ?.poster
                    }
                    alt={
                      booking
                        ?.movie
                        ?.title
                    }
                    className="w-[110px] h-[160px] rounded-2xl object-cover"
                  />

                  {/* INFO */}
                  <div className="flex-1">

                    {/* TITLE */}
                    <h2 className="text-3xl font-black">
                      {
                        booking
                          ?.movie
                          ?.title
                      }
                    </h2>

                    {/* USER */}
                    <div className="flex items-center gap-3 mt-5 text-gray-300">

                      <User
                        size={20}
                        className="text-[#FFCC00]"
                      />

                      <span>
                        {
                          booking
                            ?.user
                            ?.name
                        }
                      </span>
                    </div>

                    {/* THEATER */}
                    <div className="flex items-center gap-3 mt-4 text-gray-300">

                      <Film
                        size={20}
                        className="text-[#FFCC00]"
                      />

                      <span>
                        {
                          booking?.theater
                        }
                      </span>
                    </div>

                    {/* DATE */}
                    <div className="flex items-center gap-3 mt-4 text-gray-300">

                      <CalendarDays
                        size={20}
                        className="text-[#FFCC00]"
                      />

                      <span>
                        {
                          booking?.date
                        }{" "}
                        •{" "}
                        {
                          booking?.time
                        }
                      </span>
                    </div>

                    {/* AMOUNT */}
                    <div className="flex items-center gap-3 mt-4 text-gray-300">

                      <IndianRupee
                        size={20}
                        className="text-[#FFCC00]"
                      />

                      <span>
                        ₹
                        {
                          booking?.amount
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="border-t border-white/10 px-6 py-5 flex flex-wrap items-center justify-between gap-4">

                  {/* SEATS */}
                  <div>

                    <p className="text-sm text-gray-400">
                      Seats
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {booking?.seats?.map(
                        (
                          seat,
                          index
                        ) => (
                          <span
                            key={
                              index
                            }
                            className="px-4 py-2 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] font-semibold"
                          >
                            {seat}
                          </span>
                        )
                      )}

                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold">
                    Paid
                  </div>
                </div>
              </div>
            )
          )}

        </div>
      )}
    </section>
  );
};

export default ManageBookings;