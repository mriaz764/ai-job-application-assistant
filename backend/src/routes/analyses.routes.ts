import { Router } from "express";

import {
  createAnalysisController,
  getAnalysesController,
  getAnalysisByIdController,
} from "../controllers/analyses.controller.js";

const router = Router();

router.get("/", getAnalysesController);
router.get("/:id", getAnalysisByIdController);
router.post("/", createAnalysisController);

export default router;
