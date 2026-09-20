import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { env } from "../../config/env.js";
import { AIServiceError } from "../../errors/AIServiceError.js";
import {
  aiAnalysisResultSchema,
  type AIAnalysisResult,
} from "../../schemas/aiAnalysis.schema.js";
import type { AIAnalysisInput, AIService } from "./ai.service.js";

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const toAIServiceError = (error: unknown): AIServiceError => {
  if (error instanceof OpenAI.RateLimitError) {
    return new AIServiceError(
      "AI service is temporarily unavailable. Please try again later.",
      503,
      "openai",
      error.code ?? undefined,
    );
  }

  if (error instanceof OpenAI.AuthenticationError) {
    return new AIServiceError(
      "AI service authentication failed.",
      502,
      "openai",
      error.code ?? undefined,
    );
  }

  if (error instanceof OpenAI.PermissionDeniedError) {
    return new AIServiceError(
      "AI service access was denied.",
      502,
      "openai",
      error.code ?? undefined,
    );
  }

  if (error instanceof OpenAI.APIConnectionTimeoutError) {
    return new AIServiceError(
      "AI service is currently unavailable.",
      503,
      "openai",
      error.code ?? undefined,
    );
  }

  if (error instanceof OpenAI.APIConnectionError) {
    return new AIServiceError(
      "AI service is currently unavailable.",
      503,
      "openai",
      error.code ?? undefined,
    );
  }

  if (
    error instanceof OpenAI.InternalServerError ||
    (error instanceof OpenAI.APIError &&
      error.status !== undefined &&
      error.status >= 500)
  ) {
    return new AIServiceError(
      "AI service is currently unavailable.",
      503,
      "openai",
      error.code ?? undefined,
    );
  }

  if (error instanceof OpenAI.APIError) {
    return new AIServiceError(
      "AI analysis failed.",
      502,
      "openai",
      error.code ?? undefined,
    );
  }

  return new AIServiceError(
    "AI analysis failed.",
    502,
    "openai",
  );
};

export class OpenAIService implements AIService {
  async analyzeJobApplication(
    input: AIAnalysisInput,
  ): Promise<AIAnalysisResult> {
    try {
      const response = await client.responses.parse({
        model: "gpt-5.5",
       instructions: `
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
            `,
        input: `
          CANDIDATE RESUME:

          ${input.resume}

          JOB DESCRIPTION:

          ${input.jobDescription}
        `,
        text: {
          format: zodTextFormat(
            aiAnalysisResultSchema,
            "job_application_analysis",
          ),
        },
      });

      if (response.status !== "completed") {
        throw new Error(
          `OpenAI response was not completed. Status: ${response.status}`,
        );
      }

      if (!response.output_parsed) {
        throw new Error("OpenAI returned no structured analysis result");
      }

      return response.output_parsed;
    } catch (error) {
      const aiServiceError = toAIServiceError(error);

      console.error("OpenAI API error:", {
        provider: aiServiceError.provider,
        statusCode: aiServiceError.statusCode,
        code: aiServiceError.code,
        message: aiServiceError.message,
      });

      throw aiServiceError;
    }
  }
}