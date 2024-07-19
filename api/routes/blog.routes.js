import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAdmin, isLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isLogin, isAdmin, upload.single("file"), createBlog);
router.post("/:id", isLogin, isAdmin, upload.single("file"), updateBlog);
router.delete("/:id", isLogin, isAdmin, upload.single("file"), deleteBlog);

export default router;
