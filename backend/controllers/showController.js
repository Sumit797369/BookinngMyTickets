import { Show } from "../models/showModel.js";

export const createShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);

    return res.status(201).json(show);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};