import { Router } from "express";
import {
  fetchCurrentUser,
  fetchAllUsers,
  updateUser,
  updateUserRole,
  verifyUser,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

// User routes - requires authentication
router.get("/me", authenticate, fetchCurrentUser);
router.put("/me", authenticate, updateUser);

// Admin routes
router.get("/", authenticate, authorize(["ADMIN"]), fetchAllUsers);
router.patch("/:id/role", authenticate, authorize(["ADMIN"]), updateUserRole);
router.patch("/:id/verify", authenticate, authorize(["ADMIN"]), verifyUser);

export default router;