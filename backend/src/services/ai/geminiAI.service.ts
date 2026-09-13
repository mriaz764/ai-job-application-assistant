import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env.js";
import { z } from "zod";
import { AIServiceError } from "../../errors/AIServiceError.js";

import {
  aiAnalysisResultSchema,
  type AIAnalysisResult,
} from "../../schemas/aiAnalysis.schema.js";

import type { AIAnalysisInput, AIService } from "./ai.service.js";

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const getGeminiErrorDetails = (error: unknown) => {
  if (typeof error === "object" && error !== null && "status" in error) {
    const sdkError = error as {
      status?: number;
      error?: {
        code?: string;
        message?: string;
      };
    };

    return {
      statusCode: sdkError.status ?? 500,
      code: sdkError.error?.code,
      message: sdkError.error?.message,
    };
  }

  return {
    statusCode: 500,
    code: undefined,
    message: undefined,
  };
};

export class GeminiAIService implements AIService {
  async analyzeJobApplication(
    input: AIAnalysisInput,
  ): Promise<AIAnalysisResult> {
    try {
      const interaction = await client.interactions.create({
        model: "gemini-3.8-flash",

        input: `
        You are an expert technical recruiter and career advisor.

        Analyze the candidate's resume against the job description.

        Your analysis must be:
        - Objective
        - Specific
        - Based only on the provided resume and job description
        - Useful for improving the candidate's application

        Calculate a match score from 0 to 100.

        CANDIDATE RESUME:

        ${input.resume}

        JOB DESCRIPTION:

        ${input.jobDescription}
    `,

        response_format: {
          type: "text",
          mime_type: "application/json",
          schema: z.toJSONSchema(aiAnalysisResultSchema),
        },
      });

      if (!interaction.output_text) {
        throw new Error("Gemini returned no analysis result");
      }

      const parsedResult = JSON.parse(interaction.output_text);

      return aiAnalysisResultSchema.parse(parsedResult);
    } catch (error) {
      const details = getGeminiErrorDetails(error);

      console.error("Gemini API error:", {
        statusCode: details.statusCode,
        code: details.code,
      });

      if (details.statusCode === 429) {
        throw new AIServiceError(
          "AI service is temporarily unavailable. Please try again later.",
          503,
          "gemini",
          details.code,
        );
      }

      if (details.statusCode === 401) {
        throw new AIServiceError(
          "AI service authentication failed.",
          502,
          "gemini",
          details.code,
        );
      }

      if (details.statusCode === 403) {
        throw new AIServiceError(
          "AI service access was denied.",
          502,
          "gemini",
          details.code,
        );
      }

      if (details.statusCode >= 500) {
        throw new AIServiceError(
          "AI service is currently unavailable.",
          503,
          "gemini",
          details.code,
        );
      }

      throw new AIServiceError(
        "AI analysis failed.",
        502,
        "gemini",
        details.code,
      );
    }
  }
}
