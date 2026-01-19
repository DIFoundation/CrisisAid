import { Router } from "express";
import {
  fetchResources,
  fetchResourceById,
  searchResourcesByLocation,
  addResource,
  updateResource,
  verifyResource,
  deleteResource,
} from "../controllers/resource.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

// Public routes
router.get("/", fetchResources);
router.get("/search", searchResourcesByLocation);
router.get("/:id", fetchResourceById);

// Protected routes - authenticated users can create
router.post("/", authenticate, addResource);

// Admin/Volunteer routes
router.put("/:id", authenticate, authorize(["ADMIN", "VOLUNTEER"]), updateResource);
router.patch("/:id/verify", authenticate, authorize(["ADMIN", "VOLUNTEER"]), verifyResource);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteResource);

export default router;