import type { Request, Response } from "express";
import { jobAnalysisSchema } from "../schemas/jobAnalysis.schema.js";
import { analyzeJob } from "../services/jobAnalysis.service.js";

export const analyzeJobController = (req: Request, res: Response) => {
  const result = jobAnalysisSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const analysis = analyzeJob(result.data);

  return res.json({
    message: "Job analysis completed",
    analysis,
  });
};
