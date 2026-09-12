import express from "express";
import jobAnalysisRouter from "./routes/jobAnalysis.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "AI Job Application Assistant Backend is running",
  });
});

app.use("/api/job-analysis", jobAnalysisRouter);

export default app;
