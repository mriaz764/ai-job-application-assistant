import { z } from "zod";

export const createJobSchema = z.object({
  userId: z.coerce.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;

export const updateJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export type UpdateJobInput = z.infer<typeof updateJobSchema>;
