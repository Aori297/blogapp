import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("file"), createBlog);

export default router;
