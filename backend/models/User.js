import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "viewer"],
    default: "viewer"
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  }
});

export default mongoose.model("User", userSchema);