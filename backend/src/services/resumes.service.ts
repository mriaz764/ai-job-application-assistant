import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateResumeInput,
  UpdateResumeInput,
} from "../schemas/resumes.schema.js";

export const createResume = async (input: CreateResumeInput) => {
  const { userId, title, content } = input;

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

export const getResumes = async () => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, content, created_at
      FROM resumes
      ORDER BY id ASC;
    `,
  );

  return result.rows;
};

export const getResumeById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT id, user_id, title, content, created_at
      FROM resumes
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
};

export const updateResume = async (id: number, input: UpdateResumeInput) => {
  const { title, content } = input;

  const result = await pool.query(
    `
      UPDATE resumes
      SET title = $1,
          content = $2
      WHERE id = $3
      RETURNING id, user_id, title, content, created_at;
    `,
    [title, content, id],
  );

  return result.rows[0];
};

export const deleteResume = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM resumes
      WHERE id = $1
      RETURNING id;
    `,
    [id],
  );

  return result.rows[0];
};
