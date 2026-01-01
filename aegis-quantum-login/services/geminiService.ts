
import { GoogleGenAI, Type } from "@google/genai";
import { SecurityReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSecurityAssessment = async (username: string): Promise<SecurityReport> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the digital footprint of user "${username}" in a futuristic sci-fi setting. Provide a security assessment.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            threatLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH'] },
            lastBreach: { type: Type.STRING },
            encryptionStatus: { type: Type.STRING },
            aiComment: { type: Type.STRING, description: "A brief, immersive sci-fi security commentary." }
          },
          required: ["threatLevel", "lastBreach", "encryptionStatus", "aiComment"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      threatLevel: 'LOW',
      lastBreach: 'None detected in current sector',
      encryptionStatus: 'Quantum-Hardened',
      aiComment: 'Local node operating at 99.9% efficiency. Proceed with caution, Operator.'
    };
  }
};

export const getWelcomeMessage = async (username: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, cool, futuristic greeting for a user named "${username}" who just logged into a high-security quantum terminal. Keep it under 20 words.`,
    });
    return response.text || `Welcome back, ${username}. Systems online.`;
  } catch (error) {
    return `Welcome back, ${username}. Systems online.`;
  }
};
