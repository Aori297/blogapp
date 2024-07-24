import { uploadImage } from "../helpers/cloudinary.js";
import { BadRequestError } from "../helpers/error-handler.js";
import { BlogModel } from "../models/blog.model.js";
import { findBlogById } from "../services/blog.service.js";

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
      coverImage: {
        publicId: result.public_id,
        url: result?.secure_url || "",
      },
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

export const updateBlog = async (req, res) => {
  try {
    const { title, content, shortDescription, tags } = req.body;

    const blog = await BlogModel.findById(req.params.id);

    let result;

    if (req.file) {
      await deleteImage(blog.coverImage.publicId);

      result = await uploadImage(req.file);
      if (!result.public_id) {
        throw new BadRequestError("Error while uploading to cloudinary");
      }
    }

    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: title,
          content: content,
          shortDescription: shortDescription,
          ...(result && {
            coverImage: {
              publicId: result.public_id,
              url: result.secure_url,
            },
          }),
          tags: tags,
        },
      }
    );

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError(error.message);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await findBlogById(req.params.id);

    if (blog.author.toString() !== req.user.id) {
      throw new UnauthorizedError("You are not allowed to delete.");
    }

    await deleteImage(blog.coverImage.publicId);
    await BlogModel.findByIdAndDelete(blog._id);

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError(error.message);
  }
};

export const fetchSingleBlog = async (req, res) => {
  const blog = await BlogModel.findById(req.params.id).populate(
    "author",
    "email firstname lastname profilePicture"
  );
  if (!blog) throw new NotFoundError("Blog not found");

  return res.status(200).json(blog);
};

export const fetchAllBlogs = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const search = req.query.search || "";

  const skip = (page - 1) * limit;

  const query = { title: { $regex: search, $options: "i" } };

  const blog = await BlogModel.find(query)
    .skip(skip)
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("author", "email profilePicture firstname lastname");

  const total = await BlogModel.countDocuments(query);

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    blog,
    total,
    page,
    totalPages,
  });
};
