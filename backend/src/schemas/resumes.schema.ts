import { z } from "zod";

export const createResumeSchema = z.object({
  userId: z.coerce.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;

export const updateResumeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;
