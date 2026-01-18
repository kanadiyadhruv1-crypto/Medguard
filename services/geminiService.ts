
import { GoogleGenAI, Type } from "@google/genai";

// Always use new GoogleGenAI({apiKey: process.env.API_KEY})
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeIncident = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a clinical safety expert. Analyze this incident: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: "Suggested severity: LOW, MEDIUM, HIGH, or CRITICAL" },
            summary: { type: Type.STRING, description: "One sentence professional summary" },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 short safety recommendations" 
            }
          },
          required: ["riskLevel", "summary", "recommendations"]
        }
      }
    });
    // Use .text property directly
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("AI Analysis failed", error);
    return null;
  }
};
