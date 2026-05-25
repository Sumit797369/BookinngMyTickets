import jwt from "jsonwebtoken";

// USER AUTH
export const isAuth =
  (req, res, next) => {
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

      req.userId =
        decoded.id;

      next();

    } catch (error) {

      return res.status(401).json({
        message:
          "Invalid token",
      });
    }
  };

// ADMIN AUTH
export const isAdmin =
  (req, res, next) => {
    try {

      const token =
        req.cookies
          .adminToken;

      if (!token) {

        return res.status(401).json({
          message:
            "Admin unauthorized",
        });
      }

      const decoded =
        jwt.verify(
          token,
          process.env
            .JWT_SECRET
        );

      if (
        decoded.role !==
        "admin"
      ) {

        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      req.admin =
        decoded;

      next();

    } catch (error) {

      return res.status(401).json({
        message:
          "Invalid admin token",
      });
    }
  };