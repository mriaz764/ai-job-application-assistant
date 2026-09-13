import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type { CreateJobInput, UpdateJobInput } from "../schemas/jobs.schema.js";

export const createJob = async (input: CreateJobInput) => {
  const { userId, title, company, description } = input;

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

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23503"
    ) {
      throw new AppError("User not found", 404);
    }

    throw new AppError("Failed to create job", 500);
  }
};

export const getJobs = async () => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, company, description, created_at
      FROM jobs
      ORDER BY id ASC;
    `,
  );

  return result.rows;
};

export const getJobById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, company, description, created_at
      FROM jobs
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
};

export const updateJob = async (id: number, input: UpdateJobInput) => {
  const { title, company, description } = input;

  const result = await pool.query(
    `
      UPDATE jobs
      SET title = $1,
          company = $2,
          description = $3
      WHERE id = $4
      RETURNING id, user_id, title, company, description, created_at;
    `,
    [title, company ?? null, description, id],
  );

  return result.rows[0];
};

export const deleteJob = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM jobs
      WHERE id = $1
      RETURNING id;
    `,
    [id],
  );

  return result.rows[0];
};
