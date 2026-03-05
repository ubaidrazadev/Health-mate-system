import Report from "../../Models/ReportModel/reportModel.js";
import AiInsight from "../../Models/ReportModel/aiInsightModel.js";
import { generateHealthInsight } from "../../Services/AiService/aiService.js";
import Vitals from "../../Models/VitalModels/vitalModel.js";

export const uploadReport = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not authenticated" });
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const report = await Report.create({
            patient: req.user._id,
            fileUrl: req.file.path,
            publicId: req.file.filename,
            fileType: req.file.mimetype 
        });

        const insightText = await generateHealthInsight(report.fileUrl, report.fileType);

        const aiInsight = await AiInsight.create({
            report: report._id,
            insightText: insightText 
        });

        return res.status(201).json({
            success: true,
            message: "Report uploaded & AI summary generated successfully",
            data: {
                report,
                aiInsight
            }
        });

    } catch (error) {
        console.error("UploadReport Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const addVitals = async (req, res) => {
    try {
        const { bloodPressure, sugar, weight, notes, entryDate } = req.body;
        const newVitals = await Vitals.create({
            patient: req.user._id,
            bloodPressure,
            sugar,
            weight,
            notes,
            entryDate: entryDate || Date.now()
        });

        res.status(201).json({ success: true, data: newVitals });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMedicalTimeline = async (req, res) => {
    try {
        const userId = req.user._id;

        const reports = await Report.find({ patient: userId }).lean();
        const vitals = await Vitals.find({ patient: userId }).lean();

        const timeline = [
            ...reports.map(r => ({ ...r, type: 'report' })),
            ...vitals.map(v => ({ ...v, type: 'vital' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ success: true, timeline });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};