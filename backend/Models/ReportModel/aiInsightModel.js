import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({
  report: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
  insightText: { type: String, required: true },
}, { timestamps: true });

const AiInsight = mongoose.model("AiInsight", aiInsightSchema);
export default AiInsight;