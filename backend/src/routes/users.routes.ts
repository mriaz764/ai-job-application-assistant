import { Router } from "express";
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);

router.put("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;
