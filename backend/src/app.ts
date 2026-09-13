import express from "express";
import usersRouter from "./routes/users.routes.js";
import resumesRouter from "./routes/resumes.routes.js";
import jobsRouter from "./routes/jobs.routes.js";
import analysesRouter from "./routes/analyses.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/resumes", resumesRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/analyses", analysesRouter);

app.use(errorHandler);

export default app;
