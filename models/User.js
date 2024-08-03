import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide name"] },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please provide password"] },
    dateOfBirth: { type: Date },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    // gender: { type: String, required: [true, "Please provide gender"] },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
