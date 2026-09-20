import bcrypt from "bcrypt";

import { AppError } from "../errors/AppError.js";
import { getUserWithPasswordByEmail } from "./users.service.js";
import { generateAccessToken } from "../utils/jwt.js";

import type { LoginInput } from "../schemas/auth.schema.js";

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await getUserWithPasswordByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash,
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }
  const accessToken = await generateAccessToken(user.id);

    return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
};