import express from "express";
import { registerUserValidator } from "../validations/auth.validator.js";
import {
  forgotPassword,
  registerUser,
  resendEmail,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.put("/verifyEmail/:token", verifyEmail);
router.put("/resendEmail", resendEmail);
router.put("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);

export default router;
