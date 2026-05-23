import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },

    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
    },

    seats: [String],

    amount: Number,

    theater: String,

    date: String,

    time: String,

    paymentStatus: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model("Booking", bookingSchema);
