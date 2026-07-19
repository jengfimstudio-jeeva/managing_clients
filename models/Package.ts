import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  isCustom: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  defaultTaskTitles: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Package || mongoose.model("Package", PackageSchema);
