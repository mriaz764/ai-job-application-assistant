import { createAnalysisSchema } from "../schemas/analyses.schema.js";
import {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
} from "../services/analyses.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { parseId } from "../utils/parseId.js";

export const createAnalysisController = asyncHandler(async (req, res) => {
  const result = createAnalysisSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const analysis = await createAnalysis(result.data);

  return res.status(201).json({
    message: "Analysis created successfully",
    analysis,
  });
});

export const getAnalysesController = asyncHandler(async (_req, res) => {
  const analyses = await getAnalyses();

  return res.json({
    analyses,
  });
});

export const getAnalysisByIdController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid analysis ID",
    });
  }

  const analysis = await getAnalysisById(id);

  if (!analysis) {
    return res.status(404).json({
      message: "Analysis not found",
    });
  }

  return res.json({
    analysis,
  });
});
