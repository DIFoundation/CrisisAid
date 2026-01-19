import { Router } from "express";
import { fetchResources, addResource } from "../controllers/resource.controller";

const router = Router();

router.get("/", fetchResources);
router.post("/", addResource);

export default router;
