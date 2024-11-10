import cloudinary from "../lib/cloudinary.js";
import { AlbumModel } from "../models/album.model.js";
import { SongModel } from "../models/song.model.js";

// helper function for file upload
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        })
        return result.secure_url;
    } catch (error) {
        console.log("Error in UploadToCloudinary", error);
        throw new Error("Error uploading to Cloudinary");
    }
}

// create song controller
export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "Please upload all files"
            })
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const songUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new SongModel({
            title,
            artist,
            songUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save();

        // if song belongs to any album, update the album's songs array
        if (albumId) {
            await AlbumModel.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            })
        }

        res.status(201).json({
            song,
            message: "Song created successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in create-song controller : ", error.message)
        next(error);
    }
}

// delete song controller
export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await SongModel.findById(id);

        // if song belongs to an album, update the album's song array
        if (song.albumId) {
            await AlbumModel.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })
        }
        await SongModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Song deleted successfully"
        })

    } catch (error) {
        console.log("Error in deleteSong controller : " + error.message);
        next(error);
    }
}

// create album controller
export const createAlbum = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "Please upload image"
            })
        }
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new AlbumModel({
            title,
            artist,
            imageUrl,
            releaseYear
        })

        album.save();
        res.status(201).json({
            message: "Album created successfully",
            success: true,
            album
        })


    } catch (error) {
        console.log("Error in create-album controller : " + error.message);
        next(error);
    }
}

// delete album
export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await SongModel.deleteMany({ albumId: id })
        await AlbumModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Album deleted successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in delete-album controller : " + error.message);
        next(error);
    }
}

// check-admin controller
export const checkAdmin = async (req, res, next) => {
    try {
        res.status(200).json({ admin: true })

    } catch (error) {
        console.log("Error in check-admin controller : " + error.message);
        next();
    }
}