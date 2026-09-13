import { z } from "zod";

export const aiAnalysisResultSchema = z.object({
  matchScore: z.number().int().min(0).max(100),

  summary: z.string().min(1),

  matchedSkills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  recommendations: z.array(z.string()),
});

export type AIAnalysisResult = z.infer<typeof aiAnalysisResultSchema>;
