import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the Gemini API client
// The API key is strictly obtained from process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using the specific model requested for high capability tasks
const MODEL_NAME = 'gemini-3-pro-preview';

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: "You are Verdia, a friendly and knowledgeable gardening expert. You help users identify plants, diagnose issues, and provide care tips. Keep your answers concise, encouraging, and practical for home gardeners. Formatting: Use Markdown. Bold key terms.",
    },
  });
};

export const analyzePlantImage = async (
  base64Data: string, 
  mimeType: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Analyze this image of a plant. 
            1. Identify the plant (Common name and Scientific name).
            2. Provide a brief description.
            3. List detailed care instructions for: Watering, Sunlight, Soil requirements, and Temperature/Humidity.
            4. Mention common pests or diseases to watch out for.
            
            Format the response using Markdown with clear headings.`
          },
        ],
      },
    });

    return response.text || "I couldn't analyze the image. Please try again.";
  } catch (error) {
    console.error("Error analyzing plant image:", error);
    throw new Error("Failed to analyze image. Please try again later.");
  }
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};