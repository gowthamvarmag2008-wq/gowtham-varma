
import { TripDetails, TripType, TripMood, DayPlan } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI (Gemini 3 Flash is preferred for fast, efficient travel tasks)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * MOCK DATABASE SERVICE
 * Simulates Firestore/MongoDB operations using LocalStorage
 */
export const StorageService = {
  saveTrip: (trip: TripDetails) => {
    const id = Date.now().toString();
    const data = { ...trip, id, createdAt: new Date().toISOString() };
    localStorage.setItem(`trip_${id}`, JSON.stringify(data));
    localStorage.setItem('current_trip_id', id);
    return data;
  },
  getTrip: (id: string): TripDetails | null => {
    const data = localStorage.getItem(`trip_${id}`);
    return data ? JSON.parse(data) : null;
  },
  logAction: (action: string) => {
    const logs = JSON.parse(localStorage.getItem('user_actions') || '[]');
    logs.push({ action, timestamp: new Date().toISOString() });
    localStorage.setItem('user_actions', JSON.stringify(logs.slice(-50)));
  }
};

/**
 * PLACE INFORMATION SERVICE
 * Aggregates local data and AI insights
 */
export const PlaceService = {
  getInfo: async (placeName: string) => {
    const prompt = `Provide detailed tourist information for ${placeName}. 
    Include: description, 3 special foods, 3 major attractions/temples, 2 main hospitals, and typical transport options.
    Format as JSON.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              foods: { type: Type.ARRAY, items: { type: Type.STRING } },
              attractions: { type: Type.ARRAY, items: { type: Type.STRING } },
              hospitals: { type: Type.ARRAY, items: { type: Type.STRING } },
              transport: { type: Type.STRING },
              budgetEstimate: { type: Type.STRING }
            }
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Place Info API Error:", error);
      return null;
    }
  },

  getNearbyEmergency: async () => {
    // In a real app, this would call a mapping API. Here we simulate the logic.
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve([
          { name: "City General Hospital", distance: "1.2km", type: "Hospital", lat: pos.coords.latitude + 0.01, lng: pos.coords.longitude + 0.01 },
          { name: "Central Police Station", distance: "2.5km", type: "Police", lat: pos.coords.latitude - 0.01, lng: pos.coords.longitude - 0.01 }
        ]);
      }, () => {
        resolve([{ name: "Local Clinic", distance: "Unknown", type: "Medical" }]);
      });
    });
  }
};

/**
 * AI PERSONALIZATION SERVICE
 */
export const AIService = {
  getItinerary: async (details: TripDetails) => {
    const prompt = `Create a 1-day itinerary for ${details.userName} (${details.age}) in ${details.placeVisited}. 
    Trip type: ${details.tripType}. Mood: ${details.tripMood}.
    Return a summary and 3 specific activities with times.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  chat: async (message: string, context: TripDetails) => {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are a Smart Trip Guide. Use context: ${JSON.stringify(context)}. Be brief.`
      }
    });
    const result = await chat.sendMessage({ message });
    return result.text;
  }
};
