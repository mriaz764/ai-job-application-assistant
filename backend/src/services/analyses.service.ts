import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type { CreateAnalysisInput } from "../schemas/analyses.schema.js";
import { createAIService } from "./ai/ai.factory.js";

export const createAnalysis = async (
  userId: number,
  input: CreateAnalysisInput,
) => {
  const { resumeId, jobId } = input;

  const resumeResult = await pool.query(
    `
      SELECT id, user_id, title, content
      FROM resumes
      WHERE id = $1 AND user_id = $2;
    `,
    [resumeId, userId],
  );

  if (!resumeResult.rows[0]) {
    throw new AppError("Resume not found", 404);
  }

  const jobResult = await pool.query(
    `
      SELECT id, user_id, title, company, description
      FROM jobs
      WHERE id = $1 AND user_id = $2;
    `,
    [jobId, userId],
  );

  if (!jobResult.rows[0]) {
    throw new AppError("Job not found", 404);
  }

  const resume = resumeResult.rows[0];
  const job = jobResult.rows[0];

  const aiService = createAIService();

  const aiResult = await aiService.analyzeJobApplication({
    resume: resume.content,
    jobDescription: job.description,
  });

  const matchScore =
  aiResult.scoreBreakdown.skillsMatch +
  aiResult.scoreBreakdown.experienceMatch +
  aiResult.scoreBreakdown.requirementsMatch +
  aiResult.scoreBreakdown.educationMatch +
  aiResult.scoreBreakdown.otherFactors;

  const analysisResult = await pool.query(
    `
      INSERT INTO analyses (
        user_id,
        resume_id,
        job_id,
        match_score,
        result
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        user_id,
        resume_id,
        job_id,
        match_score,
        result,
        created_at;
    `,
    [
      userId,
      resumeId,
      jobId,
       matchScore,
    JSON.stringify({
      ...aiResult,
      matchScore,
    }),
    ],
  );

  return analysisResult.rows[0];
};

export const getAnalyses = async (userId: number) => {
  const result = await pool.query(
    `
      SELECT
        id,
        user_id,
        resume_id,
        job_id,
        match_score,
        result,
        created_at
      FROM analyses
      WHERE user_id = $1
      ORDER BY id ASC;
    `,
    [userId],
  );

  return result.rows;
};

export const getAnalysisById = async (
  userId: number,
  id: number,
) => {
  const result = await pool.query(
    `
      SELECT
        id,
        user_id,
        resume_id,
        job_id,
        match_score,
        result,
        created_at
      FROM analyses
      WHERE id = $1 AND user_id = $2;
    `,
    [id, userId],
  );

  return result.rows[0];
};