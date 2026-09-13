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
      matchScore: 78,

      summary: `Mock analysis generated for the provided resume and job description.`,

      matchedSkills: ["TypeScript", "Node.js", "PostgreSQL", "Docker"],

      missingSkills: ["Next.js", "RAG", "AI Agents"],

      strengths: ["Backend development", "REST API development"],

      weaknesses: [
        "Limited Next.js experience",
        "Limited production AI experience",
      ],

      recommendations: [
        "Improve Next.js experience",
        "Build a RAG project",
        "Build an AI agent using tool calling",
      ],
    };

    return aiAnalysisResultSchema.parse(result);
  }
}
