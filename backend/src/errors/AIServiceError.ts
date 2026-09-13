export class AIServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public provider: string,
    public code?: string,
  ) {
    super(message);
    this.name = "AIServiceError";
  }
}
