import express from "express";
import usersRouter from "./routes/users.routes.js";
import resumesRouter from "./routes/resumes.routes.js";
import jobAnalysisRouter from "./routes/jobAnalysis.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/resumes", resumesRouter);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "AI Job Application Assistant Backend is running",
  });
});

app.use("/api/job-analysis", jobAnalysisRouter);

app.use(errorHandler);

export default app;
