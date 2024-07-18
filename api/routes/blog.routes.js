import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAdmin, isLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isLogin, isAdmin, upload.single("file"), createBlog);

export default router;
