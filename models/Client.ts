import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  status: { type: String, enum: ["completed", "not_completed"], default: "not_completed" },
  orderIndex: { type: Number, required: true },
});

const ClientSchema = new mongoose.Schema({
  enterpriseName: { type: String, required: true },
  customerName: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  tasks: [TaskSchema],
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
