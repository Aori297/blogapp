import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/error-handler.js";

export const isLogin = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new UnauthorizedError("Authorization Required");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("Invalid Token");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = payload;
  next();
};

export const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    throw new UnauthorizedError("Admin Role Required");
  }
  next();
};
