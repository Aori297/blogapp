import express from "express";
import { registerUserValidator } from "../validations/auth.validator.js";
import {
  registerUser,
  resendEmail,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.put("/verifyEmail/:token", verifyEmail);
router.put("/resendEmail", resendEmail);

export default router;
