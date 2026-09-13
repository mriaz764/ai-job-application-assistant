import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type { CreateAnalysisInput } from "../schemas/analyses.schema.js";
import { createAIService } from "./ai/ai.factory.js";

export const createAnalysis = async (input: CreateAnalysisInput) => {
  const { resumeId, jobId } = input;

  const resumeResult = await pool.query(
    `
      SELECT id, user_id, title, content
      FROM resumes
      WHERE id = $1;
    `,
    [resumeId],
  );

  if (!resumeResult.rows[0]) {
    throw new AppError("Resume not found", 404);
  }

  const jobResult = await pool.query(
    `
      SELECT id, user_id, title, company, description
      FROM jobs
      WHERE id = $1;
    `,
    [jobId],
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

  const matchScore = aiResult.matchScore;

  const analysisResult = await pool.query(
    `
      INSERT INTO analyses (
        resume_id,
        job_id,
        match_score,
        result
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        resume_id,
        job_id,
        match_score,
        result,
        created_at;
    `,
    [resumeId, jobId, matchScore, JSON.stringify(aiResult)],
  );

  return analysisResult.rows[0];
};

export const getAnalyses = async () => {
  const result = await pool.query(
    `
      SELECT
        id,
        resume_id,
        job_id,
        match_score,
        result,
        created_at
      FROM analyses
      ORDER BY id ASC;
    `,
  );

  return result.rows;
};

export const getAnalysisById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT
        id,
        resume_id,
        job_id,
        match_score,
        result,
        created_at
      FROM analyses
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
};
