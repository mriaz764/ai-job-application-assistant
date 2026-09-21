import { Router } from "express";

import { loginController, getCurrentUserController, logoutController, createUserController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginController);
router.post("/register", createUserController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;