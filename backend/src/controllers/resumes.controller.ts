import {
  createResumeSchema,
  updateResumeSchema,
} from "../schemas/resumes.schema.js";

import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../services/resumes.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { parseId } from "../utils/parseId.js";

export const createResumeController = asyncHandler(async (req, res) => {
  const result = createResumeSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const resume = await createResume(result.data);

  return res.status(201).json({
    message: "Resume created successfully",
    resume,
  });
});

export const getResumesController = asyncHandler(async (_req, res) => {
  const resumes = await getResumes();

  return res.json({
    resumes,
  });
});

export const getResumeByIdController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid resume ID",
    });
  }

  const resume = await getResumeById(id);

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }

  return res.json({
    resume,
  });
});

export const updateResumeController = asyncHandler(async (req, res) => {
  const result = updateResumeSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid resume ID",
    });
  }

  const resume = await updateResume(id, result.data);

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }

  return res.json({
    message: "Resume updated successfully",
    resume,
  });
});

export const deleteResumeController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid resume ID",
    });
  }

  const resume = await deleteResume(id);

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }

  return res.json({
    message: "Resume deleted successfully",
  });
});
