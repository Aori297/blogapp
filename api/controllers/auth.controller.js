import jwt from "jsonwebtoken";
import { BadRequestError } from "../helpers/error-handler.js";
import { UserModel } from "../models/user.model.js";
import { findUser } from "../services/user.service.js";
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

// Send email verification link
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await UserModel.findOneAndUpdate(
      { emailVerificationToken: token },
      {
        $set: {
          emailVerified: true,
          emailVerificationToken: "",
          emailVerificationExpires: null,
        },
      }
    );

    if (!user) {
      throw new BadRequestError("Invalid token or user not found");
    }

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError(error.message);
  }
};

// resend email verification link
export const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  console.log(user);
  if (user.emailVerified) {
    throw new BadRequestError("Email is already verified");
  }
  const emailVerificationToken = await generateRandomToken();
  const emailVerificationExpires = addExpiryHours();

  user.emailVerificationToken = emailVerificationToken;
  user.emailVerificationExpires = emailVerificationExpires;
  await user.save();

  const mailOptions = {
    from: "admin@blog.com",
    to: user.email,
    subject: "Email Verification",
    template: "verifyEmail",
    context: {
      fullName: user.fullName,
      url: `${process.env.CLIENT_URL}/verify-email/${user.emailVerificationToken}`,
    },
  };

  await sendMail(mailOptions);

  return res.status(200).json({
    message: "Email verification token resent successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  console.log(user);

  const passwordResetToken = await generateRandomToken();
  const passwordResetExpires = addExpiryHours();

  user.passwordResetToken = passwordResetToken;
  user.passwordResetExpires = passwordResetExpires;
  await user.save();

  const mailOptions = {
    from: "admin@blog.com",
    to: user.email,
    subject: "Reset Password",
    template: "resetPassword",
    context: {
      fullName: user.fullName,
      url: `${process.env.CLIENT_URL}/resetPassword/${user.passwordResetToken}`,
    },
  };

  await sendMail(mailOptions);

  return res.status(200).json({
    message: "Password Reset sent successfully",
  });
};
export const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Passwords do not match");
  }

  const token = req.params.token;
  const user = await findUser({ passwordResetToken: token });

  user.password = password;
  user.passwordResetToken = "";
  user.passwordResetExpires = null;
  await user.save();

  return res.status(200).json({
    message: "Password reset successfully",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email });
  if (!user) {
    throw new BadRequestError("Invalid email or password");
  }

  const matchedPassword = await user.comparePassword(password);
  if (!matchedPassword) {
    throw new BadRequestError("Invalid email or password");
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(200).json({
    user,
    accessToken,
  });
};
