import { z } from "zod";

export const createAnalysisSchema = z.object({
  resumeId: z.coerce.number().int().positive(),
  jobId: z.coerce.number().int().positive(),
});

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>;
