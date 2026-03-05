import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  fileType: { type: String },
  aisummary: { type: String }
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);
export default Report;