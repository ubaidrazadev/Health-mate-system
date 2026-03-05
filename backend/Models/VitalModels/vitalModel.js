import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodPressure: { type: String },
  sugar: { type: Number },
  weight: { type: Number },
  notes: { type: String },
  entryDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Vitals = mongoose.model("Vitals", vitalsSchema);
export default Vitals;