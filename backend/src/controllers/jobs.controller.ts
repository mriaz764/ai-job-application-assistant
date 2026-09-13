import { createJobSchema, updateJobSchema } from "../schemas/jobs.schema.js";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../services/jobs.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { parseId } from "../utils/parseId.js";

export const createJobController = asyncHandler(async (req, res) => {
  const result = createJobSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const job = await createJob(result.data);

  return res.status(201).json({
    message: "Job created successfully",
    job,
  });
});

export const getJobsController = asyncHandler(async (_req, res) => {
  const jobs = await getJobs();

  return res.json({
    jobs,
  });
});

export const getJobByIdController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid job ID",
    });
  }

  const job = await getJobById(id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  return res.json({
    job,
  });
});

export const updateJobController = asyncHandler(async (req, res) => {
  const result = updateJobSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid job ID",
    });
  }

  const job = await updateJob(id, result.data);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  return res.json({
    message: "Job updated successfully",
    job,
  });
});

export const deleteJobController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid job ID",
    });
  }

  const job = await deleteJob(id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  return res.json({
    message: "Job deleted successfully",
  });
});
