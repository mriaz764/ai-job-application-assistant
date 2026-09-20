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

          Calculate the candidate's match using this scoring framework:

          1. Skills match: 0-40 points
            Evaluate how closely the candidate's technical and professional skills
            match the skills required by the job.

          2. Experience match: 0-25 points
            Evaluate how closely the candidate's professional experience,
            responsibilities, seniority, and domain experience match the role.

          3. Job requirements match: 0-20 points
            Evaluate how many important job requirements the candidate satisfies.

          4. Education match: 0-10 points
            Evaluate how well the candidate's education matches the stated
            education requirements or expectations.

          5. Other relevant factors: 0-5 points
            Consider other relevant factors explicitly supported by the resume
            and job description.

          IMPORTANT:
          - Do not invent experience, skills, qualifications, or achievements.
          - Use only information present in the resume and job description.
          - Each score must remain within its specified maximum.
          - The backend will calculate the final match score from these categories.
          - Do not return a separate final score.

          Identify:
          - Skills that match the job
          - Skills that are missing
          - Candidate strengths
          - Candidate weaknesses
          - Practical recommendations

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
