import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },

    theater: String,

    screen: String,

    showDate: String,

    showTime: String,

    price: Number,

    totalSeats: Number,

    bookedSeats: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Show =
  mongoose.model("Show", showSchema);