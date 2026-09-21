import type { Request, Response } from "express";

import { loginSchema } from "../schemas/auth.schema.js";
import { login,profile, register } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { env } from "../config/env.js";
import { createUserSchema } from "../schemas/users.schema.js";

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid request",
        errors: parsed.error.flatten(),
      });
    }

    const result = await login(parsed.data);

    res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      accessToken: result.accessToken,
    });
  },
);

export const createUserController = asyncHandler(async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: parsed.error.flatten(),
    });
  }

  const result = await register(parsed.data);
   res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

  return res.status(201).json({
    message: "User created successfully",
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await profile(req.user!.id);

    return res.status(200).json({
      message: "Current user",
      user: result,
    });
  },
);

export const logoutController = asyncHandler(async (_req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
});