// controllers/paymentController.js

import crypto from "crypto";

import jwt from "jsonwebtoken";

import razorpayInstance from "../config/razorpay.js";

import { Booking } from "../models/bookingModel.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,

      currency: "INR",

      receipt: "receipt_order",
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      bookingData,
    } = req.body;

    // VERIFY SIGNATURE
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // GET USER TOKEN
    const token = req.cookies.token || req.cookies.userToken;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED USER:", decoded);

    // CHECK ALREADY BOOKED SEATS
    const existingBookings = await Booking.find({
      movie: bookingData.movie,

      date: bookingData.date,

      time: bookingData.time,
    });

    // ALL BOOKED SEATS
    const alreadyBookedSeats = existingBookings.flatMap(
      (booking) => booking.seats,
    );

    // CHECK DUPLICATE
    const seatAlreadyBooked = bookingData.seats.some((seat) =>
      alreadyBookedSeats.includes(seat),
    );

    if (seatAlreadyBooked) {
      return res.status(400).json({
        message: "This seat has already been booked",
      });
    }

    // SAVE BOOKING
    const booking = await Booking.create({
      movie: bookingData.movie,

      user: decoded.id,

      seats: bookingData.seats,

      amount: bookingData.amount,

      theater: bookingData.theater,

      date: bookingData.date,

      time: bookingData.time,

      paymentStatus: "paid",
    });
    console.log("NEW BOOKING:", booking);
    return res.status(201).json({
      success: true,

      booking,
    });
    console.log("BOOKING SAVED:", booking);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
