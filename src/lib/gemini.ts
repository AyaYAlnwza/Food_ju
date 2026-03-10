import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client using the environment variable exposed by Vite
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeFoodImage(base64Image: string) {
    try {
        // We expect the base64 string without the data URL prefix if possible,
        // or we'll clean it up if it has one.
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|webp);base64,/, "");

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: 'Analyze this image and identify the food. Estimate its nutritional value. Return ONLY a valid JSON object with the following structure: { "name": "Food Name", "calories": 500, "protein": 20, "carbs": 50, "fat": 15, "tags": ["HIGH PROTEIN", "HEALTHY"] }. The tags should be 1-3 short uppercase strings classifying the food. Do not include any other text or markdown block markers.' },
                        { inlineData: { data: cleanBase64, mimeType: 'image/jpeg' } }
                    ]
                }
            ],
            config: {
                responseMimeType: 'application/json',
            }
        });

        if (response.text) {
            return JSON.parse(response.text);
        }
        throw new Error('No text returned from Gemini');
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw error;
    }
}
