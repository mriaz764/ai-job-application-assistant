import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../errors/AppError.js";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError("Authentication required", 401);
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError("Invalid authorization header", 401);
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
