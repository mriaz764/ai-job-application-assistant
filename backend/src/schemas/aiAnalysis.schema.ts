import { z } from "zod";

export const aiAnalysisResultSchema = z.object({
  scoreBreakdown: z.object({
    skillsMatch: z.number().int().min(0).max(40),
    experienceMatch: z.number().int().min(0).max(25),
    requirementsMatch: z.number().int().min(0).max(20),
    educationMatch: z.number().int().min(0).max(10),
    otherFactors: z.number().int().min(0).max(5),
  }),

  summary: z.string().min(1),

  matchedSkills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  recommendations: z.array(z.string()),
});

export type AIAnalysisResult = z.infer<typeof aiAnalysisResultSchema>;