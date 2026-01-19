import { Router } from "express";
import {
  fetchAlerts,
  fetchActiveAlerts,
  fetchAlertById,
  createAlert,
  updateAlert,
  deactivateAlert,
  deleteAlert,
} from "../controllers/alert.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

// Public routes
router.get("/", fetchAlerts);
router.get("/active", fetchActiveAlerts);
router.get("/:id", fetchAlertById);

// Protected routes - Admin only
router.post("/", authenticate, authorize(["ADMIN"]), createAlert);
router.put("/:id", authenticate, authorize(["ADMIN"]), updateAlert);
router.patch("/:id/deactivate", authenticate, authorize(["ADMIN"]), deactivateAlert);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteAlert);

export default router;