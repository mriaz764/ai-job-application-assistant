import { pool } from "../config/database.js";
import { AppError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../schemas/users.schema.js";

export const createUser = async (input: CreateUserInput) => {
  const { name, email, password } = input;

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at;
      `,
      [name, email, passwordHash],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      throw new AppError("Email already exists", 409);
    }

    throw new AppError("Failed to create user", 500);
  }
};
export const getUsers = async () => {
  const result = await pool.query(
    `
      SELECT id, name, email, created_at
      FROM users
      ORDER BY id ASC;
    `,
  );

  return result.rows;
};

export const getUserById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT id, name, email, created_at
      FROM users
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
};

export const getUserWithPasswordByEmail = async (email: string) => {
  const result = await pool.query(
    `
      SELECT id, name, email, password_hash, created_at
      FROM users
      WHERE email = $1;
    `,
    [email],
  );

  return result.rows[0];
};

export const updateUser = async (id: number, input: UpdateUserInput) => {
  const { name, email } = input;

  try {
    const result = await pool.query(
      `
        UPDATE users
        SET name = $1,
            email = $2
        WHERE id = $3
        RETURNING id, name, email, created_at;
      `,
      [name, email, id],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      throw new AppError("Email already exists", 409);
    }

    throw new AppError("Failed to update user", 500);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const result = await pool.query(
      `
        DELETE FROM users
        WHERE id = $1
        RETURNING id;
      `,
      [id],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error);

    throw new AppError("Failed to delete user", 500);
  }
};
