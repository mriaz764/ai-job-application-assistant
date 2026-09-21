import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../errors/AppError.js";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      } else {
        token = req.cookies?.access_token;
      }
      if (!token) {
        throw new AppError("Unauthorized", 401);
      }

    const payload = await verifyAccessToken(token);

    if (!payload.sub) {
      throw new AppError("Invalid authentication token", 401);
    }

    req.user = {
      id: Number(payload.sub),
    };

    next();
  } catch (error) {
     if (error instanceof AppError) {
    return next(error);
  }
  return next(new AppError("Invalid or expired token", 401));
  }
};
