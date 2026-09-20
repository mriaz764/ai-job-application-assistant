import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    PORT: z.coerce.number().int().positive().default(3001),

    DATABASE_HOST: z.string().min(1),
    DATABASE_PORT: z.coerce.number().int().positive(),
    DATABASE_USER: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    DATABASE_NAME: z.string().min(1),

    AI_PROVIDER: z.enum(["gemini", "openai", "mock"]).default("gemini"),

    GEMINI_API_KEY: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),

    JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  })
  .superRefine((env, ctx) => {
    if (env.AI_PROVIDER === "gemini" && !env.GEMINI_API_KEY) {
      ctx.addIssue({
        code: "custom",
        path: ["GEMINI_API_KEY"],
        message: "GEMINI_API_KEY is required when AI_PROVIDER is gemini",
      });
    }

    if (env.AI_PROVIDER === "openai" && !env.OPENAI_API_KEY) {
      ctx.addIssue({
        code: "custom",
        path: ["OPENAI_API_KEY"],
        message: "OPENAI_API_KEY is required when AI_PROVIDER is openai",
      });
    }
  });

export const env = envSchema.parse(process.env);
