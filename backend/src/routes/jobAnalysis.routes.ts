import { Router } from "express";
import { analyzeJobController } from "../controllers/jobAnalysis.controller.js";

const router = Router();

router.post("/", analyzeJobController);

export default router;
