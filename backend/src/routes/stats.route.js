import { Router } from "express";
import { getstats } from "../controllers/stats.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.get('/' ,protectRoute , requireAdmin, getstats)

export default router;