import { Car } from "../models/cars.js";
import { Insight } from "../models/insight.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.GOOGLE_API_KEY;

export async function getInsights() {
  const changeStream = Car.watch();
  changeStream.on("change", async (change) => {
    if (
      change.operationType === "insert" ||
      change.operationType === "update"
    ) {
      if (change.updatedFields) {
        for (const [key, value] of Object.entries(
          change.updateDescription.updatedFields
        )) {
          if (key === "images") return;
        }
      }
      const carId = change.documentKey._id;
      const car = await Car.findById(
        carId,
        "title description car_type dealer year"
      );

      try {
        const newInsight = await getInsightsFromAI(car);
        console.log(newInsight);
        await Insight.findOneAndUpdate(
          { carId: carId },
          {
            marketInsights: newInsight.marketInsights,
            popularFeatures: newInsight.popularFeatures,
            recommendations: newInsight.recommendations,
          },
          { upsert: true }
        );
      } catch (error) {
        console.error("Error getting insights from AI:", error);
      }
    }
  });
}

let getInsightsFromAI = async (car) => {
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        marketInsights: {
          type: "string",
        },
        popularFeatures: {
          type: "string",
        },
        recommendations: {
          type: "string",
        },
      },
      required: ["marketInsights", "popularFeatures", "recommendations"],
    },
  };
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: generationConfig,
    });

    const result = await model.generateContent(
      "keep words below 20: " + JSON.stringify(car)
    );

    return JSON.parse(result.response.text());
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
