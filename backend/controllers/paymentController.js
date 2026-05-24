import crypto from "crypto";

import razorpayInstance from "../config/razorpay.js";

import { Booking } from "../models/bookingModel.js";

export const createOrder =
  async (req, res) => {
    try {

      const {
        amount,
      } = req.body;

      const options = {
        amount:
          amount * 100,

        currency: "INR",

        receipt:
          "receipt_order",
      };

      const order =
        await razorpayInstance.orders.create(
          options
        );

      return res
        .status(200)
        .json(order);

    } catch (error) {

      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const verifyPayment =
  async (req, res) => {
    try {

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,

        bookingData,
      } = req.body;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
              "|" +
              razorpay_payment_id
          )
          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {

        return res.status(400).json({
          message:
            "Payment verification failed",
        });
      }

      // SAVE BOOKING
      const booking =
        await Booking.create(
          bookingData
        );

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