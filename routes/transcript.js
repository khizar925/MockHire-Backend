import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { transcript } = req.body;

        if (!transcript) {
            return res.status(400).json({ error: "Transcript is required" });
        }

        const prompt = `
You are an AI interviewer analyzing a mock interview transcript. Your task is to evaluate the candidate thoroughly and critically. 

IMPORTANT: This output will be consumed directly by my backend code, so you MUST respond with a valid JSON ONLY, strictly following this exact structure below, without any additional commentary, explanation, or formatting. 

Provide a detailed JSON response ONLY, structured exactly as follows:

{
  "totalScore": number,
  "finalAssessment": string,
  "categoryScores": [
    {
      "name": string,
      "score": number,
      "comment": string
    }
  ],
  "strengths": [string],
  "areasForImprovement": [string]
}

Use ONLY the following evaluation categories:  
- Communication Skills  
- Technical Knowledge  
- Problem-Solving  
- Cultural & Role Fit  
- Confidence & Clarity

Analyze the following transcript:  
"""  
${transcript}  
"""

Remember, your entire response MUST be valid JSON without any extra text or symbols. Give a realistic score. If transcript is short and you cannot analyze it then give less score.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        if (!response) {
            return res.status(500).json({ error: "No response from AI" });
        }

        // Remove markdown code blocks like ```json ... ```
        const cleanedText = response.text.replace(/```json|```/g, '').trim();

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            return res.status(500).json({ error: "Invalid JSON from AI" });
        }

        res.status(200).json(jsonResponse);

    } catch (error) {
        console.error("Error in / route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
