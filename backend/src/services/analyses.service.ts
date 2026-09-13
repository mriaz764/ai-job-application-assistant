import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type { CreateAnalysisInput } from "../schemas/analyses.schema.js";

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

  // Temporary mock analysis.
  // We will replace this with a real LLM later.
  const result = {
    matchedSkills: ["TypeScript", "Node.js", "PostgreSQL", "Docker"],
    missingSkills: ["Next.js", "RAG", "AI Agents"],
    strengths: ["Backend development", "REST API development"],
    recommendations: [
      "Improve Next.js experience",
      "Build more AI agent projects",
    ],
    summary: `Analysis generated for "${resume.title}" against "${job.title}".`,
  };

  const matchScore = 78;

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
    [resumeId, jobId, matchScore, JSON.stringify(result)],
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
