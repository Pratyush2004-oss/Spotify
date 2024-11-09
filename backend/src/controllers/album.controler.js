import { AlbumModel } from "../models/album.model.js"

// get all albums
export const getallAlbums = async (req, res, next) => {
    try {
        const albums = await AlbumModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, albums })
    } catch (error) {
        console.log("Error in get-album controller : " + error.message)
        next(error);
    }
}

// get single album by Id 
export const getAlbumById = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const album = await AlbumModel.findById(albumId).populate("songs");

        if (!album) {
            return res.status(404).json({ success: false, message: "Album not found" })
        }

        res.status(200).json({
            success: true,
            album
        })
    } catch (error) {
        console.log("Error in get-album-by-id controller : " + error.message)
        next(error);
    }
}