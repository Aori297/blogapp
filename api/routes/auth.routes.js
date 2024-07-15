import express from "express";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validations/auth.validator.js";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resendEmail,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { isAdmin, isLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.put("/verifyEmail/:token", verifyEmail);
router.put("/login", loginUserValidator, loginUser);
router.put("/resendEmail", resendEmail);
router.put("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);

router.get("/test", isLogin, isAdmin, (req, res) => {
  res.send("Hello");
});

export default router;
