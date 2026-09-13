import { Router } from "express";

import {
  createResumeController,
  getResumesController,
  getResumeByIdController,
  updateResumeController,
  deleteResumeController,
} from "../controllers/resumes.controller.js";

const router = Router();

router.get("/", getResumesController);
router.get("/:id", getResumeByIdController);
router.post("/", createResumeController);
router.put("/:id", updateResumeController);
router.delete("/:id", deleteResumeController);

export default router;
