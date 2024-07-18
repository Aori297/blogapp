import { uploadImage } from "../helpers/cloudinary.js";
import { BadRequestError } from "../helpers/error-handler.js";
import { BlogModel } from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, shortDescription, tags } = req.body;

    let result;

    if (req.file) {
      result = await uploadImage(req.file);
      if (!result.public_id) {
        throw new BadRequestError("Error while uploading to cloudinary");
      }
    }

    const blog = await BlogModel.create({
      title,
      content,
      shortDescription,
      author: req.user.id,
      coverImage: result?.secure_url || "",
      tags,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError(error.message);
  }
};
