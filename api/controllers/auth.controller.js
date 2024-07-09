import { BadRequestError } from "../helpers/error-handler.js";
import { UserModel } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  try {
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
