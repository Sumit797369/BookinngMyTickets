import { Booking } from "../models/bookingModel.js";
import jwt from "jsonwebtoken";

export const bookTickets = async (req, res) => {
  try {

    const {
      showId,
      seats,
      amount,
      movieId,
      theater,
      date,
      time,
    } = req.body;

    const token =
      req.cookies.token;

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // CHECK ALREADY BOOKED SEATS
    const existingBookings =
      await Booking.find({
        movie: movieId,

        date,

        time,
      });

    const alreadyBookedSeats =
      existingBookings.flatMap(
        (booking) =>
          booking.seats
      );

    const seatAlreadyBooked =
      seats.some((seat) =>
        alreadyBookedSeats.includes(
          seat
        )
      );

    if (seatAlreadyBooked) {

      return res.status(400).json({
        message:
          "This seat has already been booked",
      });
    }

    const booking =
      await Booking.create({
        user: decoded.id,

        show: showId,

        movie: movieId,

        seats,

        amount,

        theater,

        date,

        time,
      });

    // UPDATE SHOW
    if (showId) {

      await Show.findByIdAndUpdate(
        showId,
        {
          $push: {
            bookedSeats: {
              $each: seats,
            },
          },
        }
      );
    }

    return res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookedSeats =
  async (req, res) => {
    try {

      const { movieId } =
        req.params;

      const {
        date,
        time,
      } = req.query;

      const bookings =
        await Booking.find({
          movie: movieId,

          date,

          time,
        });

      // ALL BOOKED SEATS
      const bookedSeats =
        bookings.flatMap(
          (booking) =>
            booking.seats
        );

      return res
        .status(200)
        .json(bookedSeats);

    } catch (error) {

      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const getMyBookings = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const bookings = await Booking.find({
      user: decoded.id,
    })
      .populate("movie")
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
