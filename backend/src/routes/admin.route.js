import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.use(protectRoute, requireAdmin);

router.post('/create-song', createSong)
router.delete('/songs/:id', deleteSong)
router.post('/create-album', createAlbum)
router.delete('/albums/:id', deleteAlbum)
router.get('/check', checkAdmin)

export default router;