import { Router } from "express";
import { getAlbumById, getallAlbums } from "../controllers/album.controler.js";
const router = Router();

router.get('/', getallAlbums);
router.get('/:id', getAlbumById);

export default router;