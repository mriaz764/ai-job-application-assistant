import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateResumeInput,
  UpdateResumeInput,
} from "../schemas/resumes.schema.js";

export const createResume = async ( userId: number,input: CreateResumeInput) => {
  const { title, content } = input;

  try {
    const result = await pool.query(
      `
        INSERT INTO resumes (user_id, title, content)
        VALUES ($1, $2, $3)
        RETURNING id, user_id, title, content, created_at;
      `,
      [userId, title, content],
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

    throw new AppError("Failed to create resume", 500);
  }
};

export const getResumes = async (userId: number) => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, content, created_at
      FROM resumes
      WHERE user_id = $1
      ORDER BY id ASC;
    `,
    [userId]
  );

  return result.rows;
};

export const getResumeById = async ( userId: number,resumeId: number,) => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, content, created_at
      FROM resumes
      WHERE id = $1 AND user_id = $2;
    `,
    [resumeId, userId],
  );

  return result.rows[0];
};

export const updateResume = async (
  userId: number,
  resumeId: number,
  input: UpdateResumeInput) => {
  const { title, content } = input;

  const result = await pool.query(
    `
      UPDATE resumes
      SET title = $1,
          content = $2
      WHERE id = $3 AND user_id = $4
      RETURNING id, user_id, title, content, created_at;
    `,
    [title, content, resumeId, userId],
  );

  return result.rows[0];
};

export const deleteResume = async (userId: number, resumeId: number) => {
  const result = await pool.query(
    `
      DELETE FROM resumes
      WHERE id = $1 AND user_id = $2
      RETURNING id;
    `,
    [resumeId, userId],
  );

  return result.rows[0];
};
