import { z } from "zod";

export const jobAnalysisSchema = z.object({
  resume: z.string().min(1),
  jobDescription: z.string().min(1),
});
