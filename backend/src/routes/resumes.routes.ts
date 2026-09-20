import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  createResumeController,
  getResumesController,
  getResumeByIdController,
  updateResumeController,
  deleteResumeController,
} from "../controllers/resumes.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getResumesController);
router.get("/:id", getResumeByIdController);
router.post("/", createResumeController);
router.put("/:id", updateResumeController);
router.delete("/:id", deleteResumeController);

export default router;
