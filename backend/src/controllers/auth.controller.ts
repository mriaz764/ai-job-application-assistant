import type { Request, Response } from "express";

import { loginSchema } from "../schemas/auth.schema.js";
import { login } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      accessToken: result.accessToken,
    });
  },
);

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(200).json({
      user: req.user,
    });
  },
);