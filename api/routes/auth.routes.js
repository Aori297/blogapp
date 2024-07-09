import express from "express";
import { registerUserValidator } from "../validations/auth.validator.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);

export default router;
