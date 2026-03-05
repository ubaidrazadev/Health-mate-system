import { model } from "../../Config/GeminiConfig/geminiConfig.js";
import axios from "axios";

const normalizeMimeType = (fileType) => {
    if (!fileType) return 'image/jpeg'
    if (fileType === 'image/jpg') return 'image/jpeg'
    if (fileType === 'application/pdf') return 'application/pdf'
    if (fileType.startsWith('image/')) return fileType
    return 'image/jpeg'
}

export const generateHealthInsight = async (fileUrl, fileType) => {
    try {
        console.log("📥 File URL:", fileUrl)
        console.log("📄 Raw fileType:", fileType)

        const mimeType = normalizeMimeType(fileType)
        console.log("🔧 Normalized mimeType:", mimeType)

        let fetchUrl = fileUrl
        if (mimeType === 'application/pdf') {
            fetchUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/')
        }

        console.log("🔗 Fetching from:", fetchUrl)

        const response = await axios.get(fetchUrl, { 
            responseType: 'arraybuffer',
            timeout: 30000,
            headers: {
                'Accept': '*/*',
            }
        })

        const fileBuffer = Buffer.from(response.data)
        const base64Data = fileBuffer.toString("base64")
        console.log("✅ Downloaded:", fileBuffer.length, "bytes")

        const prompt = `Analyze this medical report and provide:

1. ABNORMAL VALUES: List high/low values outside normal range.

2. SUMMARY (English): Simple explanation of findings.

3. SUMMARY (Roman Urdu): Same in simple Roman Urdu.

4. QUESTIONS FOR DOCTOR: 3-5 important questions to ask.

5. DIET ADVICE:
- Avoid: foods to avoid
- Eat: recommended foods
- Home remedies if any

6. DISCLAIMER: Always consult your doctor. Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.`

        console.log("🧠 Sending to Gemini...")

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [
                    { inlineData: { mimeType, data: base64Data } },
                    { text: prompt }
                ]
            }]
        })

        const responseText = result.response.text()
        console.log("✅ Gemini done! Length:", responseText.length)
        return responseText

    } catch (error) {
        console.error("❌ Full error:", error.message)
        if (error.response) {
            console.error("Status:", error.response.status)
        }
        throw new Error("AI analysis failed: " + error.message)
    }
}