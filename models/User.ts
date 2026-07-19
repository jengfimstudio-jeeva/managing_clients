import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  image: { type: String },
  role: { type: String, enum: ["admin", "member"], default: "admin" },
  resetCode: { type: String },
  resetCodeExpiry: { type: Date }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
