import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateJobInput,
  UpdateJobInput,
} from "../schemas/jobs.schema.js";

export const createJob = async (
  userId: number,
  input: CreateJobInput,
) => {
  const { title, company, description } = input;

  try {
    const result = await pool.query(
      `
        INSERT INTO jobs (user_id, title, company, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, title, company, description, created_at;
      `,
      [userId, title, company ?? null, description],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error);

    throw new AppError("Failed to create job", 500);
  }
};

export const getJobs = async (userId: number) => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, company, description, created_at
      FROM jobs
      WHERE user_id = $1
      ORDER BY id ASC;
    `,
    [userId],
  );

  return result.rows;
};

export const getJobById = async (
  userId: number,
  id: number,
) => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, company, description, created_at
      FROM jobs
      WHERE id = $1 AND user_id = $2;
    `,
    [id, userId],
  );

  return result.rows[0];
};

export const updateJob = async (
  userId: number,
  id: number,
  input: UpdateJobInput,
) => {
  const { title, company, description } = input;

  const result = await pool.query(
    `
      UPDATE jobs
      SET title = $1,
          company = $2,
          description = $3
      WHERE id = $4 AND user_id = $5
      RETURNING id, user_id, title, company, description, created_at;
    `,
    [title, company ?? null, description, id, userId],
  );

  return result.rows[0];
};

export const deleteJob = async (
  userId: number,
  id: number,
) => {
  const result = await pool.query(
    `
      DELETE FROM jobs
      WHERE id = $1 AND user_id = $2
      RETURNING id;
    `,
    [id, userId],
  );

  return result.rows[0];
};