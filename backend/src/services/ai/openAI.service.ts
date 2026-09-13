import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { env } from "../../config/env.js";

import {
  aiAnalysisResultSchema,
  type AIAnalysisResult,
} from "../../schemas/aiAnalysis.schema.js";

import type { AIAnalysisInput, AIService } from "./ai.service.js";

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export class OpenAIService implements AIService {
  async analyzeJobApplication(
    input: AIAnalysisInput,
  ): Promise<AIAnalysisResult> {
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

            Identify:
            1. Skills that match the job
            2. Skills that are missing
            3. Candidate strengths
            4. Candidate weaknesses
            5. Practical recommendations

            Calculate a match score from 0 to 100.
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
  }
}
