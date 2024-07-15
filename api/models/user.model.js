import { Schema, model } from "mongoose";
import { hash, genSalt, compare } from "bcrypt";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, trim: true },
    profilePicture: { type: String, default: "" },
    role: { type: String, default: "user" },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, default: "" },
    emailVerificationExpires: { type: Date, default: null },
    passwordResetToken: { type: String, default: "" },
    passwordResetExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return compare(password, this.password);
};

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const UserModel = model("User", userSchema);
