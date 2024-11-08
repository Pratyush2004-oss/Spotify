import { Router } from "express";
import { getSongById, getAllSongs, getFeaturedSongs, getMadeForyou, getTrending } from "../controllers/songs.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/maade-for-u', getMadeForyou);
router.get('/trending', getTrending);
router.get('/:id', getSongById);

export default router;