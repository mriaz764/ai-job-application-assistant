import {
  aiAnalysisResultSchema,
  type AIAnalysisResult,
} from "../../schemas/aiAnalysis.schema.js";

import type { AIAnalysisInput, AIService } from "./ai.service.js";

export class MockAIService implements AIService {
  async analyzeJobApplication(
    input: AIAnalysisInput,
  ): Promise<AIAnalysisResult> {
    const result = {
      scoreBreakdown: {
        skillsMatch: 32,
        experienceMatch: 20,
        requirementsMatch: 16,
        educationMatch: 8,
        otherFactors: 4,
      },

      summary:
        "The candidate has strong backend development experience that aligns with several requirements of the role.",

      matchedSkills: [
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Docker",
      ],

      missingSkills: [
        "Next.js",
        "RAG",
        "AI Agents",
      ],

      strengths: [
        "Backend development",
        "REST API development",
      ],

      weaknesses: [
        "Limited Next.js experience",
        "Limited production AI experience",
      ],

      recommendations: [
        "Improve Next.js experience",
        "Build an AI agent using tool calling",
        "Build a RAG project",
      ],
    };

    return aiAnalysisResultSchema.parse(result);
  }
}
