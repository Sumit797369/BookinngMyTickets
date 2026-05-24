import {Booking} from "../models/bookingModel.js";
import { Movie } from "../models/movieModel.js";
import { Show } from "../models/showModel.js";

export const getDashboardData =
  async (req, res) => {
    try {

      const totalMovies =
        await Movie.countDocuments();

      const totalShows =
        await Show.countDocuments();

      const totalBookings =
        await Booking.countDocuments();

      // REVENUE
      const revenueData =
        await Booking.aggregate([
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount",
              },
            },
          },
        ]);

      const totalRevenue =
        revenueData[0]?.total || 0;

      // RECENT BOOKINGS
      const recentBookings =
        await Booking.find()
          .populate("movie")
          .populate("user")
          .sort({ createdAt: -1 })
          .limit(5);

      return res.status(200).json({
        totalMovies,
        totalShows,
        totalBookings,
        totalRevenue,
        recentBookings,
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getAllBookings =
  async (req, res) => {
    try {

      const bookings =
        await Booking.find()
          .populate(
            "movie"
          )
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      return res
        .status(200)
        .json(bookings);

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  };