import {Booking} from "../models/bookingModel.js";

export const bookTickets = async (req, res) => {
  try {
    const {
      showId,
      seats,
      amount,
      movieId,
    } = req.body;

    const token = req.cookies.token;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const booking = await Booking.create({
      user: decoded.id,
      show: showId,
      movie: movieId,
      seats,
      amount,
    });

    // UPDATE SHOW BOOKED SEATS
    await Show.findByIdAndUpdate(showId, {
      $push: {
        bookedSeats: { $each: seats },
      },
    });

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