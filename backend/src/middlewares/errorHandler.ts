import type { NextFunction, Request, Response } from "express";

import { AIServiceError } from "../errors/AIServiceError.js";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof AIServiceError) {
    console.error("AI service error:", {
      provider: error.provider,
      code: error.code,
      statusCode: error.statusCode,
      message: error.message,
    });

    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error("Unexpected error:", error);

  return res.status(500).json({
    message: "Internal server error",
  });
};
