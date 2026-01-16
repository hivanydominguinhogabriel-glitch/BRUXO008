
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateIcebreaker = async (targetProfile: UserProfile): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma frase de engate criativa e respeitosa em Português de Moçambique para alguém que mora em Tete. 
      Nome: ${targetProfile.name}, Interesses: ${targetProfile.interests.join(', ')}, Bairro: ${targetProfile.neighborhood}.
      Seja charmoso, use gírias locais leves se apropriado (como 'txilar', 'mambo') e mencione algo sobre Tete ou o calor da cidade.`,
      config: {
        temperature: 0.8,
        maxOutputTokens: 100,
      }
    });
    return response.text || "Olá! Como vai você?";
  } catch (error) {
    console.error("Error generating icebreaker:", error);
    return "Olá! Gostei muito do seu perfil.";
  }
};

export const getTeteDateSpots = async (lat?: number, lng?: number) => {
  try {
    const prompt = "Quais são os melhores lugares para um primeiro encontro na cidade de Tete, Moçambique? Liste restaurantes, parques ou locais perto do Rio Zambeze.";
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: lat && lng ? { latitude: lat, longitude: lng } : { latitude: -16.156, longitude: 33.586 } // Default Tete coordinates
          }
        }
      },
    });

    return {
      text: response.text,
      links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error fetching date spots:", error);
    return null;
  }
};
