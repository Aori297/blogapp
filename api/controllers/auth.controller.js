import { BadRequestError } from "../helpers/error-handler.js";
import { UserModel } from "../models/user.model.js";
import { sendMail } from "../utils/sendMail.js";
import {
  addExpiryHours,
  generateRandomAvatar,
  generateRandomToken,
} from "../utils/utils.js";

//
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const emailVerificationToken = await generateRandomToken();
  const profilePicture = generateRandomAvatar();
  const emailVerificationExpires = addExpiryHours();

  try {
    // Creating a new user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      emailVerificationToken,
      emailVerificationExpires,
    });

    // Send email verification link to user's email address
    const mailOptions = {
      from: "admin@blog.com",
      to: newUser.email,
      subject: "Email Verification",
      template: "verifyEmail",
      context: {
        fullName: newUser.fullName,
        url: `${process.env.CLIENT_URL}/verify-email/${newUser.emailVerificationToken}`,
      },
    };

    sendMail(mailOptions);

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
