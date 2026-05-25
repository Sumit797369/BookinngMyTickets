import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existUser = await User.findOne({
      email,
    });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,

      email,

      password: hashedPassword,

      provider: "local",

      role: role || "user",
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ADMINS
    const admins = [
      {
        email: process.env.PVR_EMAIL,

        password: process.env.PVR_PASSWORD,

        name: "PVR: MBD Mall",
      },

      {
        email: process.env.INOX_EMAIL,

        password: process.env.INOX_PASSWORD,

        name: "INOX: Reliance Mall",
      },

      {
        email: process.env.CINEPOLIS_EMAIL,

        password: process.env.CINEPOLIS_PASSWORD,

        name: "Cinepolis: Viva Collage",
      },
    ];

    const admin = admins.find(
      (a) => a.email === email && a.password === password,
    );

    // ADMIN LOGIN
    if (admin) {
      const token = jwt.sign(
        {
          email: admin.email,

          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      // ADMIN COOKIE
      res.cookie("adminToken", token, {
        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        name: admin.name,

        email: admin.email,

        role: "admin",
      });
    }

    // USER LOGIN
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // GOOGLE BLOCK
    if (user.provider === "google") {
      return res.status(400).json({
        message: "Please login with Google",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,

        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // USER COOKIE
    res.cookie("userToken", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GOOGLE AUTH
export const googleAuth =
  async (req, res) => {
    try {

      const {
        name,
        email,
        avatar,
      } = req.body;

      if (!email) {

        return res.status(400).json({
          message:
            "Email is required",
        });
      }

      let user =
        await User.findOne({
          email,
        });

      // CREATE USER
      if (!user) {

        user =
          await User.create({
            name,

            email,

            avatar,

            provider:
              "google",
          });

      } else {

        // UPDATE USER
        if (!user.avatar) {

          user.avatar =
            avatar;
        }

        if (!user.name) {

          user.name =
            name;
        }

        user.provider =
          "google";

        await user.save();
      }

      // TOKEN
      const token =
        jwt.sign(
          {
            id: user._id,

            role:
              user.role,
          },
          process.env
            .JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      // USER COOKIE
      res.cookie(
        "userToken",
        token,
        {
          httpOnly: true,

          secure:
            process.env
              .NODE_ENV ===
            "production",

          sameSite:
            "strict",

          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
      );

      return res.status(200).json({
        id: user._id,

        name:
          user.name,

        email:
          user.email,

        avatar:
          user.avatar,

        role:
          user.role,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          `Google auth error ${error}`,
      });
    }
  };

// LOGOUT
export const logOut = async (req, res) => {
  try {
    res.clearCookie("userToken");

    res.clearCookie("adminToken");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ME
export const getMe = async (req, res) => {
  try {
    // ADMIN
    const adminToken = req.cookies.adminToken;

    if (adminToken) {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

      let adminName = "Admin";

      if (decoded.email.includes("pvr")) {
        adminName = "PVR Admin";
      } else if (decoded.email.includes("inox")) {
        adminName = "INOX Admin";
      } else if (decoded.email.includes("cinepolis")) {
        adminName = "Cinepolis Admin";
      }

      return res.status(200).json({
        name: adminName,

        email: decoded.email,

        role: "admin",
      });
    }

    // USER
    const userToken = req.cookies.userToken;

    if (!userToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROFILE
export const updateProfile =
  async (req, res) => {
    try {

      const token =
        req.cookies
          .userToken;

      if (!token) {

        return res.status(401).json({
          message:
            "Unauthorized",
        });
      }

      const decoded =
        jwt.verify(
          token,
          process.env
            .JWT_SECRET
        );

      const {
        name,
        avatar,
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          decoded.id,
          {
            name,
            avatar,
          },
          {
            new: true,
          }
        ).select(
          "-password"
        );

      return res.status(200).json(
        user
      );

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  };

// UPDATE AVATAR
export const updateAvatar =
  async (req, res) => {
    try {

      const token =
        req.cookies
          .userToken;

      if (!token) {

        return res.status(401).json({
          message:
            "Unauthorized",
        });
      }

      const decoded =
        jwt.verify(
          token,
          process.env
            .JWT_SECRET
        );

      const user =
        await User.findById(
          decoded.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (!req.file) {

        return res.status(400).json({
          message:
            "No file uploaded",
        });
      }

      const avatarUrl =
        `http://localhost:8000/uploads/${req.file.filename}`;

      user.avatar =
        avatarUrl;

      await user.save();

      return res.status(200).json({
        success: true,

        user,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  };