import type { AIAnalysisResult } from "../../schemas/aiAnalysis.schema.js";

export interface AIAnalysisInput {
  resume: string;
  jobDescription: string;
}

export interface AIService {
  analyzeJobApplication(input: AIAnalysisInput): Promise<AIAnalysisResult>;
}
