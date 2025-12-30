
import { GoogleGenAI } from "@google/genai";

export const editImageWithGemini = async (mainImage: string, secondaryImage: string | null, prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const mainData = mainImage.split(',')[1];
  const parts: any[] = [
    {
      inlineData: {
        data: mainData,
        mimeType: 'image/png',
      },
    }
  ];

  let systemPrompt = "";

  if (secondaryImage) {
    const secondaryData = secondaryImage.split(',')[1];
    parts.push({
      inlineData: {
        data: secondaryData,
        mimeType: 'image/png',
      },
    });
    systemPrompt = `
      TASK: Image Composition & Merging.
      - Image 1 is the background/base scene.
      - Image 2 contains the person/object to be added.
      - User Request: ${prompt}
      INSTRUCTIONS: Extract the subject from Image 2 and place them into Image 1 realistically. 
      Match lighting, perspective, and shadows. Maintain original facial features from Image 2.
    `;
  } else {
    systemPrompt = `
      TASK: Image Editing.
      - Image 1: The photo to be edited.
      - User Request: ${prompt}
      INSTRUCTIONS: Perform the requested edit naturally while maintaining the style and quality.
    `;
  }

  parts.push({ text: systemPrompt });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts },
  });

  if (!response.candidates || response.candidates.length === 0) {
    throw new Error("لم نتمكن من معالجة الصور، حاول مرة أخرى.");
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("فشل في استلام الصورة الناتجة.");
};
