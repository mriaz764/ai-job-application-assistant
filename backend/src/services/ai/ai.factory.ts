import { env } from "../../config/env.js";

import type { AIService } from "./ai.service.js";
import { GeminiAIService } from "./geminiAI.service.js";
import { MockAIService } from "./mockAI.service.js";
import { OpenAIService } from "./openAI.service.js";

export const createAIService = (): AIService => {
  switch (env.AI_PROVIDER) {
    case "gemini":
      return new GeminiAIService();

    case "openai":
      return new OpenAIService();

    case "mock":
      return new MockAIService();

    default:
      throw new Error(`Unsupported AI provider: ${env.AI_PROVIDER}`);
  }
};
