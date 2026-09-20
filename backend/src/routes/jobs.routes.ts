import { Router } from "express";

import {
  createJobController,
  getJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
} from "../controllers/jobs.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getJobsController);
router.get("/:id", getJobByIdController);
router.post("/", createJobController);
router.put("/:id", updateJobController);
router.delete("/:id", deleteJobController);

export default router;
