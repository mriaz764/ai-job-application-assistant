import { Router } from "express";

import {
  createAnalysisController,
  getAnalysesController,
  getAnalysisByIdController,
} from "../controllers/analyses.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAnalysesController);
router.get("/:id", getAnalysisByIdController);
router.post("/", createAnalysisController);

export default router;
