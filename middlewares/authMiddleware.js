import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
  // const token = req.cookies.access_token;

  // if (!token) {
  //   return res.status(403).json({ error: "Access token required" });
  // }

  // try {
  //   const decoded = jwt.verify(token, config.jwtSecret);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ error: "Invalid token" });
  // }

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};
